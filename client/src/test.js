const keyPressHanlder = (e) => {
    if (e.key === "Enter") {

        if (!e.target.value) {
            return alert('you need to type somthing first')
        }

        //we will send request to text query route 

        console.log(e.target.value)
        // if (e.target.value.contains('book')) {
        // eventQuery('book')
        // } else {
        textQuery(e.target.value)
        // }
        e.target.value = "";

    }
}