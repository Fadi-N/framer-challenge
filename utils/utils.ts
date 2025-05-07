export const getTimeLeft = (targetDate: Date) => {
    const now = new Date().getTime();
    const diff = targetDate.getTime() - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return {days, hours, minutes, seconds};
}