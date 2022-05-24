export function getRelativeTimeDiffStr(isoStr: string) {
    return getTimeDiffStr(new Date(), new Date(isoStr));
}

export function getTimeDiffStr(d1: Date, d2: Date) {
    const diffMs = Math.abs(d1.getTime() - d2.getTime());
    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
    
    if (years > 0) {
        if (years == 1) {
            return 'год назад';
        }

        if (years < 5) {
            return `${years} года назад`;
        }

        return `${years} лет назад`;
    }

    if (months > 0) {
        if (months == 1) {
            return 'месяц назад';
        }

        if (months < 4) {
            return `${months} месяца назад`;
        }

        return `${months} месяцев назад`;
    }

    if (days > 0) {
        if (days == 1) {
            return 'день назад';
        }

        if (days < 5) {
            return `${days} дня назад`;
        }

        return `${days} дней назад`;
    }

    if (hours > 0) {
        if (hours == 1) {
            return 'час назад';
        }

        if (hours < 5) {
            return `${hours} часа назад`;
        }

        return `${hours} часов назад`;
    }

    return `${minutes} минут назад`;
};