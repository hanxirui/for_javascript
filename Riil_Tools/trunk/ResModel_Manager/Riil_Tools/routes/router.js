module.exports = function(app) {
     
    var root = require('./root');
	var users = require('./users');
	var login = require('./login');
	var admin = require('./admin/admin');
 	var menuController = require('./menuController');
 	var fileUpload = require('./file_upload');
 	/*var fileList = require('./file_list');
 	var filedownload = require('./file_download');*/
 	var resourceTypeCotroller = require('./resourceTypeCotroller');
	var applymanager = require('./applymanager/applymanager');
	var paramlibrary = require('./paramlibrary/paramlibrary');

 	/**厂商管理*/
 	var manufController = require('./manufController');
 	/**型号管理*/
 	var vendorController = require('./vendorController');
 	/**指标组管理*/
 	var metricGroupController = require('./metricGroupController');
 	/**资源模型管理*/
 	var resModelCotroller = require('./resourceModelCotroller');


    //
    app.use('/resmodel', root);
 	app.use('/resmodel/users', users);
	app.use('/resmodel/login', login);
	app.use('/resmodel/admin', admin);
	app.use('/resmodel/menuController',menuController);
	app.use('/resmodel/file-upload/',fileUpload);
	/*app.use('/resmodel/file-list',fileList);
	app.use('/resmodel/download',filedownload);*/
	app.use('/resmodel/resourceTypeCotroller',resourceTypeCotroller);
 	app.use('/resmodel/applymanager',applymanager);
 	app.use('/resmodel/paramlibrary',paramlibrary);
 	/**厂商管理*/
 	app.use('/resmodel/manufController', manufController);
 	/**型号管理*/
 	app.use('/resmodel/vendorController', vendorController);
 	/**指标组管理*/
 	app.use('/resmodel/metricGroupController', metricGroupController);
 	/**资源模型管理*/
 	app.use('/resmodel/resModelCotroll', resModelCotroller);

    //
	console.log('Loading Router is Completed');


};