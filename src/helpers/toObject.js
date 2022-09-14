var toObject = {
    manyData: (manyData) => {
        return manyData.map(data => data.toObject())
    },

    oneData: (oneData) => {
        return oneData.toObject()
    }
}

module.exports = toObject;