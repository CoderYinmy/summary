/**
 * 根据时间区间判断抢购时间
 * find()  找到第一个符合条件的值
 */

const durations = [
    { start: "2021/09/19 20:00", end: "2021/09/19 22:30" },
    { start: "2021/09/20 20:00", end: "2021/09/20 22:30" },
    { start: "2021/09/21 20:00", end: "2021/09/21 22:30" },
];

function parseDate(d, durations) {

    const duration = durations.find(function(duration) {
        const s = Date.parse(new Date(duration.start))
        const e = Date.parse(new Date(duration.end))

        return d>=e && d<=s
    })

    if(duration){
        const e = Date.parse(new Date(duration.end))
        return {
            type: 1,
            duration: e - d,
        }
    }else{
        const duration = durations.find(function(duration){
            const s = Date.parse(new Date(duration.start))
            return s - d > 0
        })

        if(duration.start == durations[0].start) {
            return{
                type: 1,
            }
        }
    }

}

