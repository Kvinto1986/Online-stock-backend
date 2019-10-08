const changeObjectForResponse = (object,param) => {
    const {[param]: id, password, __v,_id, ...elem} = object.toObject();
    return {...elem, id}
};

module.exports = changeObjectForResponse;