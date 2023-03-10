import {sum} from "./task.test";

test ('sum of two number', ()=>{
    //1.Тестовые данные :
    const a =10
    const b =20
    //2. Выполнение тестируемого кода
    const result = sum(a,b)
    //3. проверка результата
    expect(result).toBe(33)
})