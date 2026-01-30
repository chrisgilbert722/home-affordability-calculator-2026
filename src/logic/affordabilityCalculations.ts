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
    frontEndDTI: number; // Housing costs / income
    backEndDTI: number; // All debts / income
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

    if (monthlyRate === 0) {
        // No interest case
        // payment = loan/n + homePrice*(taxRate + insuranceRate)
        // availableForHousing = (homePrice - downPayment)/n + homePrice*(rates)
        // Solve for homePrice
        const rateSum = monthlyTaxRate + monthlyInsuranceRate;
        const loanFactor = 1 / numPayments;
        // availableForHousing = homePrice*loanFactor - downPayment/n + homePrice*rateSum
        // availableForHousing + downPayment/n = homePrice*(loanFactor + rateSum)
        maxHomePrice = (availableForHousing + input.downPayment / numPayments) / (loanFactor + rateSum);
        maxHomePrice = Math.max(0, maxHomePrice);
        maxLoanAmount = Math.max(0, maxHomePrice - input.downPayment);
        monthlyPrincipalInterest = maxLoanAmount / numPayments;
    } else {
        // With interest, use amortization formula
        // M = L * [r(1+r)^n] / [(1+r)^n - 1]
        // Let factor = [r(1+r)^n] / [(1+r)^n - 1]
        const powerFactor = Math.pow(1 + monthlyRate, numPayments);
        const amortFactor = (monthlyRate * powerFactor) / (powerFactor - 1);

        // Total monthly = L * amortFactor + homePrice * (taxRate + insuranceRate)
        // L = homePrice - downPayment
        // Total = (homePrice - downPayment) * amortFactor + homePrice * (taxRate + insuranceRate)
        // availableForHousing = homePrice * amortFactor - downPayment * amortFactor + homePrice * rates
        // availableForHousing + downPayment * amortFactor = homePrice * (amortFactor + rates)

        const rateSum = monthlyTaxRate + monthlyInsuranceRate;
        maxHomePrice = (availableForHousing + input.downPayment * amortFactor) / (amortFactor + rateSum);
        maxHomePrice = Math.max(0, maxHomePrice);
        maxLoanAmount = Math.max(0, maxHomePrice - input.downPayment);
        monthlyPrincipalInterest = maxLoanAmount * amortFactor;
    }

    // Calculate monthly taxes and insurance based on max home price
    const monthlyTaxes = maxHomePrice * monthlyTaxRate;
    const monthlyInsurance = maxHomePrice * monthlyInsuranceRate;

    // Total monthly payment
    const maxMonthlyPayment = monthlyPrincipalInterest + monthlyTaxes + monthlyInsurance;

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
        frontEndDTI,
        backEndDTI
    };
}
