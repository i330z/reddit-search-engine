export default{
    search: function(searchValue,sortBy,searchLimit){   
        return new Promise((resolve, reject) => {
            fetch(`http://www.reddit.com/search.json?q=${searchValue}&sort=${sortBy}&limit=${searchLimit}`)
            .then(res => res.json())
            .then(data => {
                let mappedData = data.data.children.map(data => data.data)
                resolve(mappedData)
            })
            .catch(err => reject(err))
        })
    }
}