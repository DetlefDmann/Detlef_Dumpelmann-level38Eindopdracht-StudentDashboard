//Deze functie geeft een array terug met alle waarden voor de key(string) die je invult
//bijvoorbeeld alle studenten of alle assignments die in het input array voorkomen
export const retrieveUniqueElements = (arr, key) => {
    const newArr = [];
    arr.forEach(element => {
        if(!newArr.includes(element[key])){
            newArr.push(element[key])
        }
    });
    return newArr;
}

//berekent de gemiddelde waarden voor funFactor en difficulty van een array 
//en geef dit terug als object.
export const calculateAverage = (arr) => {
    const length = arr.length;
    if (length>0) {
        const newAssignmentName= arr[0].assignment;
        const totalFunFactor = arr.map(element => element.funFactor).reduce((accumulated, currentValue) =>{
            return accumulated + currentValue ;
        });
        const totalDifficulty = arr.map(element => element.difficulty).reduce((accumulated, currentValue) =>{
            return accumulated + currentValue ;
        });
        const averageFunFactor = totalFunFactor/length;
        const averageDifficulty = totalDifficulty/length;
        return { assignment:newAssignmentName , funFactor:averageFunFactor , difficulty:averageDifficulty }
    }
    else {
        console.log("Select at least one student and one assignment");
        return;
    }
}

//deze functie filtert de data(array), 
//die de waarde value bij de opgegeven key heeft. (bijv. assignment==="SCRUM" of student==="Storm")
export const filterArrayByKey = (arr , key , value) => {
    const filtered = arr.filter(element => element[key]===value);
    return filtered;
}