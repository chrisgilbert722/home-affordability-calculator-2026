export interface AffordabilityInput {
    annualIncome: number;
    monthlyDebts: number; // Car payments, student loans, credit cards, etc.
    downPayment: number;
    interestRate: number; // Annual percentage
    loanTerm: 15 | 20 | 30;
    propertyTaxRate: number; // Annual percentage of home value
    insuranceRate: number; // Annual percentage of home value
    dtiLimit: number; // Debt-to-income limit (28-36% typical)
}

export interface AffordabilityResult {
    maxHomePrice: number;
    maxLoanAmount: number;
    maxMonthlyPayment: number;
    monthlyPrincipalInterest: number;
    monthlyTaxes: number;
    monthlyInsurance: number;
    monthlyPMI: number;
    frontEndDTI: number; // Housing costs / income
    backEndDTI: number; // All debts / income
    downPaymentPercentage: number;
}

export function calculateAffordability(input: AffordabilityInput): AffordabilityResult {
    const monthlyIncome = input.annualIncome / 12;

    // Calculate max housing payment based on DTI limit
    // Front-end DTI: housing costs should be <= dtiLimit% of gross income
    const maxHousingPayment = monthlyIncome * (input.dtiLimit / 100);

    // Subtract existing debts for back-end consideration
    // Back-end DTI typically 36-43%, we'll use front-end for simplicity
    const availableForHousing = Math.max(0, maxHousingPayment);

    // Estimate taxes and insurance as percentage of home value
    // We need to solve for home price where:
    // P&I + (homePrice * taxRate/12) + (homePrice * insuranceRate/12) = availableForHousing

    const monthlyRate = input.interestRate / 100 / 12;
    const numPayments = input.loanTerm * 12;
    const monthlyTaxRate = input.propertyTaxRate / 100 / 12;
    const monthlyInsuranceRate = input.insuranceRate / 100 / 12;

    let maxHomePrice: number;
    let maxLoanAmount: number;
    let monthlyPrincipalInterest: number;

    // PMI rate: 0.5% annual of loan amount, applied monthly
    const monthlyPMIRate = 0.005 / 12;

    // First, calculate assuming PMI applies (down payment < 20%)
    // Then check if it actually applies based on the result

    if (monthlyRate === 0) {
        // No interest case with PMI consideration
        const rateSum = monthlyTaxRate + monthlyInsuranceRate;
        const loanFactor = 1 / numPayments;

        // With PMI: payment = loan/n + loan*pmiRate + homePrice*rates
        // = (homePrice - downPayment)/n + (homePrice - downPayment)*pmiRate + homePrice*rates
        // = (homePrice - downPayment)*(1/n + pmiRate) + homePrice*rates
        const loanCostFactor = loanFactor + monthlyPMIRate;

        // First solve with PMI
        let maxHomePriceWithPMI = (availableForHousing + input.downPayment * loanCostFactor) / (loanCostFactor + rateSum);
        maxHomePriceWithPMI = Math.max(0, maxHomePriceWithPMI);

        // Check if PMI actually applies (down payment < 20% of home price)
        const downPaymentPctWithPMI = maxHomePriceWithPMI > 0 ? (input.downPayment / maxHomePriceWithPMI) * 100 : 0;

        if (downPaymentPctWithPMI < 20) {
            maxHomePrice = maxHomePriceWithPMI;
        } else {
            // Recalculate without PMI
            maxHomePrice = (availableForHousing + input.downPayment * loanFactor) / (loanFactor + rateSum);
            maxHomePrice = Math.max(0, maxHomePrice);
        }

        maxLoanAmount = Math.max(0, maxHomePrice - input.downPayment);
        monthlyPrincipalInterest = maxLoanAmount / numPayments;
    } else {
        // With interest, use amortization formula
        const powerFactor = Math.pow(1 + monthlyRate, numPayments);
        const amortFactor = (monthlyRate * powerFactor) / (powerFactor - 1);
        const rateSum = monthlyTaxRate + monthlyInsuranceRate;

        // With PMI: Total = loan * (amortFactor + pmiRate) + homePrice * rates
        const loanCostFactor = amortFactor + monthlyPMIRate;

        // First solve with PMI
        let maxHomePriceWithPMI = (availableForHousing + input.downPayment * loanCostFactor) / (loanCostFactor + rateSum);
        maxHomePriceWithPMI = Math.max(0, maxHomePriceWithPMI);

        // Check if PMI actually applies
        const downPaymentPctWithPMI = maxHomePriceWithPMI > 0 ? (input.downPayment / maxHomePriceWithPMI) * 100 : 0;

        if (downPaymentPctWithPMI < 20) {
            maxHomePrice = maxHomePriceWithPMI;
        } else {
            // Recalculate without PMI
            maxHomePrice = (availableForHousing + input.downPayment * amortFactor) / (amortFactor + rateSum);
            maxHomePrice = Math.max(0, maxHomePrice);
        }

        maxLoanAmount = Math.max(0, maxHomePrice - input.downPayment);
        monthlyPrincipalInterest = maxLoanAmount * amortFactor;
    }

    // Calculate down payment percentage
    const downPaymentPercentage = maxHomePrice > 0 ? (input.downPayment / maxHomePrice) * 100 : 0;

    // Calculate PMI (only if down payment < 20%)
    let monthlyPMI = 0;
    if (downPaymentPercentage < 20 && maxLoanAmount > 0) {
        monthlyPMI = maxLoanAmount * monthlyPMIRate;
    }

    // Calculate monthly taxes and insurance based on max home price
    const monthlyTaxes = maxHomePrice * monthlyTaxRate;
    const monthlyInsurance = maxHomePrice * monthlyInsuranceRate;

    // Total monthly payment (including PMI when applicable)
    const maxMonthlyPayment = monthlyPrincipalInterest + monthlyTaxes + monthlyInsurance + monthlyPMI;

    // Calculate actual DTI ratios
    const frontEndDTI = monthlyIncome > 0 ? (maxMonthlyPayment / monthlyIncome) * 100 : 0;
    const backEndDTI = monthlyIncome > 0 ? ((maxMonthlyPayment + input.monthlyDebts) / monthlyIncome) * 100 : 0;

    return {
        maxHomePrice,
        maxLoanAmount,
        maxMonthlyPayment,
        monthlyPrincipalInterest,
        monthlyTaxes,
        monthlyInsurance,
        monthlyPMI,
        frontEndDTI,
        backEndDTI,
        downPaymentPercentage
    };
}
