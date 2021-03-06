/* eslint-disable comma-dangle */
/* eslint-disable require-jsdoc */
/* eslint-disable indent */
import Vue from "vue";
import Router from "vue-router";

/* Layout */
import Layout from "@/layout";
import component from "./modules/components";

/* Router Modules */
import leetCodeRouter from "./modules/leetCode";

Vue.use(Router);
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
	{
		path: "/redirect",
		component: Layout,
		hidden: true,
		children: [
			{
				path: "/redirect/:path*",
				component: () => import("@/views/redirect/index"),
			},
		],
	},
	{
		path: "/login",
		component: () => import("@/views/login/index"),
		hidden: true,
	},
	{
		path: "/",
		component: Layout,
		redirect: "/dashboard",
		children: [
			{
				path: "dashboard",
				component: () => import("@/views/dashboard/index"),
				name: "Dashboard",
				meta: {
					title: "dashboard",
					icon: "dashboard",
					affix: true,
				},
			},
		],
	},
	{
		path: "/documentation",
		component: Layout,
		redirect: "/documentation/index",
		children: [
			{
				path: "index",
				component: () => import("@/views/documentation/index"),
				name: "Documentation",
				meta: {
					title: "documentation",
					icon: "documentation",
					affix: true,
				},
			},
		],
	},
	{
		path: "/table",
		component: Layout,
		meta: {
			title: "表格",
			icon: "chart",
		},
		children: [
			{
				path: "index",
				component: () => import("@/views/editTable/index"),
				name: "editTable",
				meta: {
					title: "可编辑表格",
					icon: "documentation",
				},
			},
			{
				path: "scrollTable",
				component: () => import("@/views/scrollTable/index"),
				name: "scrollTable",
				meta: {
					title: "虚拟表格",
					icon: "documentation",
				},
			},
			{
				path: "adaptiveTable",
				component: () => import("@/views/adaptiveTable/index"),
				name: "adaptiveTable",
				meta: {
					title: "自适应高度table",
					icon: "documentation",
				},
			},
		],
	},
	{
		path: "/dataView",
		component: Layout,
		redirect: "/dataView/index",
		alwaysShow: true, // will always show the root menu
		name: "dataView",
		meta: {
			title: "数据可视化",
			icon: "lock",
			roles: ["admin", "editor"], // you can set roles in root nav
			affix: false,
		},
		children: [
			{
				path: "index",
				component: () => import("@/views/mxgraph/index"),
				name: "mxgraph",
				meta: {
					title: "流程图",
					icon: "documentation",
					affix: false,
				},
			},
			{
				path: "draggbleLayout",
				component: () => import("@/views/draggbleLayout/index"),
				name: "draggbleLayout",
				meta: {
					title: "拖拽布局",
					icon: "documentation",
					affix: false,
				},
			},
			{
				path: "echarts",
				component: () => import("@/views/echarts/index"),
				name: "echarts",
				meta: {
					title: "图形可视化",
					icon: "documentation",
					affix: false,
				},
			},
			{
				path: "form",
				component: () => import("@/views/form/index"),
				name: "formCreator",
				meta: {
					title: "表单可视化",
					icon: "documentation",
					affix: false,
				},
			},
			{
				path: "gantt",
				component: () => import("@/views/gantt/index"),
				name: "gantt",
				meta: {
					title: "甘特图",
					icon: "documentation",
					affix: false,
				},
			},
			{
				path: "circle",
				component: () => import("@/views/circle/index"),
				name: "circle",
				meta: {
					title: "圆形进度条",
					icon: "documentation",
					affix: false,
				},
			},
		],
	},
	leetCodeRouter,
	component,
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
	{
		path: "/permission",
		component: Layout,
		redirect: "/permission/page",
		alwaysShow: true, // will always show the root menu
		name: "Permission",
		meta: {
			title: "permission",
			icon: "lock",
			roles: ["admin", "editor"], // you can set roles in root nav
		},
		children: [
			{
				path: "page",
				// component: () => import('@/views/permission/page'),
				name: "PagePermission",
				meta: {
					title: "pagePermission",
					roles: ["admin"], // or you can only set roles in sub nav
				},
			},
			{
				path: "directive",
				component: () => import("@/views/documentation/index"),
				name: "DirectivePermission",
				meta: {
					title: "directivePermission",
					// if do not set roles, means: this page does not require permission
				},
			},
		],
	},
];

const createRouter = () =>
	new Router({
		// mode: 'history', // require service support
		scrollBehavior: () => ({
			y: 0,
		}),
		routes: constantRoutes,
	});

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
	const newRouter = createRouter();
	router.matcher = newRouter.matcher; // reset router
}

// eslint-disable-next-line eol-last
export default router;
