// =====================================================================
// utils/payment.js  -  PROMISE example: "verify the payment"
//
// A Promise is an object that stands for a result that is not ready YET.
// It ends in one of two ways:
//   resolve(value)  -> it WORKED   (the caller's  .then()  runs)
//   reject(error)   -> it FAILED   (the caller's  .catch() runs)
//
// A real website would ask the bank's server if the money arrived, which
// takes time. We pretend with setTimeout (1.5 seconds).
// =====================================================================
export function verifyPayment(amount) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!navigator.onLine) {
        // No internet: the check cannot be done -> FAIL
        reject(new Error("You seem to be offline. Check your internet and try again."));
      } else if (amount <= 0) {
        reject(new Error("There is nothing to pay."));
      } else {
        // Everything fine -> SUCCESS, with a fake payment reference
        resolve({ status: "success", amount, reference: "UPI" + Date.now() });
      }
    }, 1500);
  });
}
