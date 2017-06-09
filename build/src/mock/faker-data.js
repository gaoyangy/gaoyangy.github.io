module.exports = function() {
    var faker = require("faker");
    faker.locale = "zh_CN";
    var _ = require("lodash");
    //模拟数据以对象的形式写在下面
    return {
        people: _.times(100, function(n) {
            return {
                id: n,
                name: faker.name.findName(),
                avatar: faker.internet.avatar()
            }
        }),
        address: _.times(100, function(n) {
            return {
                id: faker.random.uuid(),
                city: faker.address.city(),
                county: faker.address.county()
            }
        }),
        school: _.times(10, function(n) {
            return {
                id: '1233' + n,
                name: faker.name.firstName()
            }
        }),
        user: _.times(1, function(n) {
            return true;
        })
    }
}