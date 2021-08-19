exports.isSupportObserver = function isSupportObserver(){
    return 'mutationObserver' in window || 'WebkitMutationObserver' in window
}

//mutationObserver提供了监视对DOM所做更改的能力