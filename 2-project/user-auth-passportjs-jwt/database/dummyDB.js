module.exports.users =
    [
        {
            id: 1,
            name: "mostafa",
            password: "123"
        }
    ]

module.exports.findById = (id) => {
    return myArray.find(item => item.id === id);
}