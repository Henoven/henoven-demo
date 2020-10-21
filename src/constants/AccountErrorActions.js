import AccountError from './AccountError';

export const isFreezed = (error) => [ 
    AccountError.FreezedPaymentNotReceivedAfterTolerance,
    AccountError.FreezedPaymentNotReceivedAfterTolerance,
    AccountError.FreezedSubscriptionCanceled,
    AccountError.FreezedSubscriptionChangedForWorse,
].includes(error)
