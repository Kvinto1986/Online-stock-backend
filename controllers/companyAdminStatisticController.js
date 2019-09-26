const CompanyAdmin = require('../models/CompanyAdminModel');

exports.getStatistic = async (req, res) => {
    const {body} = req;
    if (new Date(body.to) < new Date(body.from)) {
        return res.status(400).json({
            date: 'Incorrect date period'
        })
    }

    const dbCompanyAdmins = await CompanyAdmin.aggregate([{
        $lookup: {
            from: "users", pipeline: [{
                $match: {
                    "createDate": {$gte: new Date(req.body.from), $lt: new Date(req.body.to)}
                }
            }],
            as: "created"
        }
    },
        {
            $lookup: {
                from: "users",
                pipeline: [{
                    $match: {
                        "deleteDate": {$gte: new Date(req.body.from), $lt: new Date(req.body.to)}
                    }
                }],
                as: "deleted"
            }
        }]);

    const {created, deleted} = dbCompanyAdmins[0];
    let max = 0;

    if (created.length > deleted.length) {
        max = created.length * 2
    } else max = deleted.length * 2;

    const statistic = {
        created: [created.length, max, 0],
        deleted: [deleted.length, max, 0]
    };

    res.status(200).json(statistic);
};