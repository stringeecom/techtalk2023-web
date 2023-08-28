<template>
    <small id="loader-typing">
        is typing
        <span></span>
        <span></span>
        <span></span>
    </small>
</template>

<style scoped>
#loader-typing {
    
}

#loader-typing span {
    display: inline-block;
    vertical-align: middle;
    width: 8px;
    height: 8px;
    background: black;
    border-radius: 8px;
    animation: loader 0.8s infinite alternate;
}

#loader-typing span:nth-of-type(2) {
    animation-delay: 0.2s;
}

#loader-typing span:nth-of-type(3) {
    animation-delay: 0.6s;
}

@keyframes loader {
    0% {
        opacity: 0.9;
        transform: scale(0.5);
    }

    100% {
        opacity: 0.1;
        transform: scale(1);
    }
}</style>