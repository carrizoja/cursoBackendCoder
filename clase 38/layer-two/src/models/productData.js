const arrayData = [{
    name: "Product 1",
    price: 100,
    id: 1
}]

const recoverData = () => {
    return data
};

const saveData = (data) => {
    console.log(data);
    arrayData.push(data)
    return data
};

module.exports = {
    recoverData,
    saveData
}