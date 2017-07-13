//import 数据 from ''	这里面可以获取数据
import * as types from './mutation_types'
//提交状态
export default {
	/*底部*/
	showFooter: ({ commit }) => {
		commit(types.SHOW_FOOTER)
	},
	hideFooter: ({ commit }) => {
		commit(types.HIDDE_FOOTER);
	},
	//  头部
	showHeader:({ commit }) => {
			commit(types.SHOW_HEADER);
	},
	hideHeader:({ commit }) => {
		commit(types.HIDDE_HEADER);
	},
	//  后退状态
	goBack:({ commit }) => {
			commit(types.GO_BACK);
	},
	noBack:({ commit }) => {
		commit(types.NO_BACK);
	},
	// 提交登陆状态
	loginYes:({ commit} ) =>{
			commit(types.LOGIN_YES);
	},
		// 退出登陆状态
	loginNo:({ commit} ) =>{
			commit(types.LOGIN_NO);
	}

}