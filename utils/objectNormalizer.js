const changeObjectForResponse = (object) => {
    const {_id: id, password, __v, ...elem} = object.toObject();
    return {...elem, id}
};

module.exports = changeObjectForResponse;