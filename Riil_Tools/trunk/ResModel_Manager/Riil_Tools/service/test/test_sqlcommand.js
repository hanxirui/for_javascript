/**
 * Created by R04419 on 2014/8/26.
 * SqlCommand 使用方法测试
 */
'use strict';
/*global describe,it*/
var chai = require('chai').use(require('chai-spies'));
var expect = chai.expect;
var SqlCommand = require('../class/SQLCommand.js');
var Q = require('q');

describe('SQLCommand', function() {

    function error(err) {
        if (err instanceof Error) return err;
        else return new Error(err.errMessage);
    }

    it('get', function(done){
        new SqlCommand().get('t_moni_metric_group.select').then(function(result) {
            expect(result).to.exist;
            expect(result.isError).to.be.false;
            done();
        }).fail(function(err) {
            done(error(err));
        });
    });

    it('getBySql', function(done){
        new SqlCommand().getBySql('SELECT c_id as groupId,c_name as groupName,c_desc as groupDesc FROM t_moni_metric_group')
        .then(function(result) {
            expect(result).to.exist;
            expect(result.isError).to.be.false;
            done();
        }).fail(function(err) {
            done(error(err));
        });
    });

    it('save(?)->del(?)', function(done){
        var cmd = new SqlCommand(true);

        cmd.save('t_moni_model_base.insert', {
            c_id: "RIIL_RMM_MOCHA",
            c_res_type_id: "RIIL_RMT_APPLICATION1",
            c_name: "21",
            c_desc: "21",
            c_is_snmp: "1",
            c_plugin_id: "1",
            c_main_model_id: '1',
            c_is_main: "1",
            c_tree_node_id: '1',
            c_vendor_id: '1',
            c_vendor_name: '1',
            c_precondition: '1',
            c_connect_info_desc: '1',
            c_tag1: '1',
            c_tag2: '1',
            c_tag3: '1',
            c_tag4: '1'
        })
        .then(function(result) {
            expect(result).to.exist;
            expect(result.isError).to.be.false;
            return cmd.del('t_moni_model_base.delete', ['RIIL_RMM_MOCHA']);
        })
        .then(function(result) {
            expect(result).to.exist;
            expect(result.isError).to.be.false;
            cmd.commit();
            done();
        }).fail(function(err) {
            cmd.rollback(err);
            done(error(err));
        });
    });

    it('save(insert)->save(update)->del', function(done) {
        var cmd = new SqlCommand(true);

        Q.spread([cmd.save('t_moni_metric_group.insert', {
            groupId: 'MochaTestGroup1',
            groupName: '抹茶测试组1',
            groupDesc: '执行抹茶测试时生成的数据，一般在执行完成后删除。'
        }), cmd.save('t_moni_metric_group.insert', {
            groupId: 'MochaTestGroup2',
            groupName: '抹茶测试组2',
            groupDesc: '执行抹茶测试时生成的数据，一般在执行完成后删除。'
        })], function(result1, result2) {
            expect(result1).to.exist;
            expect(result1.isError).to.be.false;
            expect(result2).to.exist;
            expect(result2.isError).to.be.false;

            return cmd.save('t_moni_metric_group.update', {
                groupId: 'MochaTestGroup2',
                groupName: '抹茶测试组_修改',
                groupDesc: '执行抹茶测试时生成的数据，一般在执行完成后删除。'
            });
        })
        .then(function(result){
            expect(result).to.exist;
            expect(result.isError).to.be.false;
            
            return cmd.del('t_moni_metric_group.delete', {
                groupIds: ['MochaTestGroup1', 'MochaTestGroup2']
            });
        })
        .then(function(result){
            expect(result).to.exist;
            expect(result.isError).to.be.false;
            cmd.commit();
            done();
        }, function(err) {
            cmd.rollback(err);
            throw error(err);
        })
        .fail(function(err) {
            done(error(err));
        });
    });

});