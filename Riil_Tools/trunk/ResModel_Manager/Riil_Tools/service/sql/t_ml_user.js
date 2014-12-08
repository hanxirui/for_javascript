module.exports = {
    selectByAccountAndPass: 'SELECT a.id' +
                            '      ,a.c_account' +
                            '      ,a.c_user_name' +
                            '      ,a.c_mail_addr' +
                            '      ,a.c_phone_num' +
                            '      ,a.c_dept' +
                            '      ,b.c_role_name' +
                            '      ,a.c_role' +
                            '  FROM t_ml_user a JOIN t_ml_role b ON a.c_role = b.c_role_id ' +
                            ' WHERE a.c_account = ? AND a.c_password = ?',

    selectByName: 'SELECT id FROM t_ml_user WHERE c_user_name != ? AND c_user_name = ?',

    selectByAccount: 'SELECT id' +
                     '      ,c_account' +
                     '      ,c_user_name' +
                     '      ,c_password' +
                     '      ,c_mail_addr' +
                     '      ,c_phone_num' +
                     '      ,c_dept' +
                     '      ,c_role' +
                     '  FROM t_ml_user' +
                     ' WHERE c_account = ?',

    selectPage: 'SELECT id' +
                '      ,c_account' +
                '      ,c_user_name' +
                '      ,c_password' +
                '      ,c_mail_addr' +
                '      ,c_phone_num' +
                '      ,c_dept' +
                '      ,c_role' +
                ' FROM t_ml_user limit ?, ?',

    delete: 'DELETE FROM t_ml_user WHERE c_account in (?)',

    update: 'UPDATE t_ml_user SET c_user_name = :cUserName' +
            '                    ,c_mail_addr = :cMailAddr' +
            '                    ,c_phone_num = :cPhoneNum' +
            '                    ,c_dept = :cDept' +
            '               WHERE c_account = :cAccount',

    insert: 'INSERT INTO t_ml_user (c_account, c_user_name, c_password, c_mail_addr, c_phone_num, c_dept) ' +
            '               VALUES (:cAccount, :cUserName, :cPassword, :cMailAddr, :cPhoneNum, :cDept)',

    selectByNullRole: 'SELECT id' +
                      '      ,c_account' +
                      '      ,c_user_name' +
                      '      ,c_password' +
                      '      ,c_mail_addr' +
                      '      ,c_phone_num' +
                      '      ,c_dept' +
                      '      ,c_role' +
                      '  FROM t_ml_user' +
                      ' WHERE c_role IS NULL',

    updateNullRoleByAccount: 'UPDATE t_ml_user SET c_role = NULL WHERE c_account IN (?)',

    updateRoleByAccount: 'UPDATE t_ml_user SET c_role = :role_id WHERE c_account IN (:acct_id)',

    selectByRole: 'SELECT a.id' +
                  '      ,a.c_account' +
                  '      ,a.c_user_name' +
                  '      ,a.c_mail_addr' +
                  '      ,a.c_phone_num' +
                  '      ,a.c_dept' +
                  '      ,b.c_role_name' +
                  '      ,a.c_role' +
                  '  FROM t_ml_user a JOIN t_ml_role b ON a.c_role = b.c_role_id'
};