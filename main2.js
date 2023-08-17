
const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
const numero = ["0","1","2","3","4","5","6"]

const time = new Date();

const today = time.getDay();

let todayCounter = 0

const forecast = numero

forecast.forEach((numb) => {
    console.log(`${numb} + ${days[today + todayCounter]}`)

    todayCounter++
})

