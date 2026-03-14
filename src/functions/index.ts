export function getMaxDate(dates: Array<Date | undefined>) {
    let maxDate: Date | null = null;

    const datesBoolean = dates
        .filter(Boolean) as Date[]
    ;

    datesBoolean.forEach(dateBool => {
        if(!maxDate || dateBool > maxDate) {
            maxDate = dateBool;
        }
    });

    return maxDate as unknown as Date | null;
}

export function formatDate(date?: Date, fullYear=true) {
    if(!date) return '';

    try {
        const format = new Date(date);
        const dateString = format.toLocaleDateString();
        
        if(fullYear) {
            return dateString;
        } else {
            const parts = dateString.split('/');

            const day = parts[0];
            const month = parts[1];
            const year = parts[2].slice(2);

            return [day, month, year].join('/')
        }
    } catch(e: any) {
        console.error(e);
        return '';
    }
}

export function formatTime(date?: Date) {
    if(!date) return '';

    try {
        const format = new Date(date);
        const timeString = format.toLocaleTimeString();
        return timeString.slice(0, 5);
    } catch(e: any) {
        console.error(e);
        return '';
    }
}

export function getLastDateOrder(order: {
    createdAt?: Date;
    updatedAt?: Date;
}) {
    const dates = [
        order.createdAt,
        order.updatedAt
    ];

    return new Date(
        Math.max(...dates.map(d => new Date(d!).getTime()))
    );
}