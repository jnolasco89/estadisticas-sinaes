export default class Consultas {

    getDataDonut() {
        let data = {
            chartdata: {
                labels: ['niños', 'niñas '],
                datasets: [
                    {
                        backgroundColor: ["blue", "red"],
                        data: [1, 4]
                    }
                ]
            },
            options: {
                tooltips:{
                    enabled:true,
                    bodyFontSize:40
                },
                legend:{
                    display:false,
                },
                title:{
                    text:'2009',
                    display:true,
                    position:'top',
                    fontSize:40
                },
                responsive: false,
                maintainAspectRatio: true,
                animation: {
                    animateRotate: false

                }
            }
        }

        return data;
    }
}