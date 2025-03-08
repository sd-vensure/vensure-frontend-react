export const getFinancialQuarter=(dateString)=> {
    const date = new Date(dateString);
    const month = date.getMonth() + 1; // Convert 0-based index to 1-12
    const year = date.getFullYear();

    let quarter;
    if (month >= 4 && month <= 6) {
        quarter = "Q1";
    } else if (month >= 7 && month <= 9) {
        quarter = "Q2";
    } else if (month >= 10 && month <= 12) {
        quarter = "Q3";
    } else {
        quarter = "Q4";
    }

    let financialYear = (month >= 4) ? `${year}-${year + 1}` : `${year - 1}-${year}`;

    return { quarter, financialYear };
}