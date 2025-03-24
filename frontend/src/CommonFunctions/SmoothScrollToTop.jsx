export const smoothScrollToTop = () => {
    const startPosition = window.pageYOffset;
    const targetPosition = 0; // Mục tiêu là đầu trang
    const distance = targetPosition - startPosition;
    const duration = 1000; // Thời gian cuộn (1 giây)
    let startTime = null;

    const scrollAnimation = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOut(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) {
            requestAnimationFrame(scrollAnimation);
        }
    };

    const easeInOut = (t, b, c, d) => {
        let time = t / (d / 2);
        if (time < 1) return (c / 2) * time * time + b;
        time--;
        return (-c / 2) * (time * (time - 2) - 1) + b;
    };

    requestAnimationFrame(scrollAnimation);
};
