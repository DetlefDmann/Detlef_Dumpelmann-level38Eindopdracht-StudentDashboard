export const retrieveUniqueElements = (arr, key) => {
    const newArr = [];
    console.log("key is:" + key)
    arr.forEach(element => {
        if(!newArr.includes(element[key])){
            newArr.push(element[key])
        }
    });
    return newArr;
}