import { ReactNode } from "react";

import {
  HomeFilled,
  SettingFilled,
  DropboxSquareFilled,
  FunnelPlotFilled,
  HddFilled,
  SlidersFilled,
  GoldOutlined,
} from "@ant-design/icons";

import LayoutBlank from "@/views/_layouts/Blank";
import LayoutContainer from "@/views/_layouts/Container";
import LayoutH5Blank from "@/views/_layouts/H5Blank";

import Login from "@/views/Login";
import HomepageHome from "@/views/homepage/Home";

import BillingInquiriesBillingOverview from "@/views/billingInquiries/BillingOverview";
import BillingInquiriesBillingAnalysis from "@/views/billingInquiries/BillingAnalysis";
import BillingInquiriesBillingDetails from "@/views/billingInquiries/BillingDetails";
import BillingInquiriesCostReduction from "@/views/billingInquiries/CostReduction";

import CostOptimizationHealthAnalysis from "@/views/costOptimization/HealthAnalysis";
import CostOptimizationNewHealthAnalysis from "@/views/costOptimization/NewHealthAnalysis";
import CostOptimizationOptimizationProposal from "@/views/costOptimization/OptimizationProposal";
import CostOptimizationOptimizationStrategy from "@/views/costOptimization/OptimizationStrategy";

import BillingManagementCustomExpenseManagement from "@/views/billingManagement/CustomExpenseManagement";
import BillingManagementAllocationRuleManagement from "@/views/billingManagement/AllocationRuleManagement";
import BillingManagementBudgetManagement from "@/views/billingManagement/BudgetManagement";
import BillingManagementBillPush from "@/views/billingManagement/BillPush";

import ResourceManagementHierarchicalManagement from "@/views/resourceManagement/HierarchicalManagement";
import ResourceManagementApplicationManagement from "@/views/resourceManagement/ApplicationManagement";
import ResourceManagementResourceList from "@/views/resourceManagement/ResourceList";
import ResourceManagementClusterManagement from "@/views/resourceManagement/ClusterManagement";

import SystemAdministrationUserManagement from "@/views/systemAdministration/UserManagement";
import SystemAdministrationCloudAccountManagement from "@/views/systemAdministration/CloudAccountManagement";
import SystemAdministrationHealthRules from "@/views/systemAdministration/HealthRules";
import SystemAdministrationTaskManagement from "@/views/systemAdministration/TaskManagement";
import SystemAdministrationLogAuditing from "@/views/systemAdministration/LogAuditing";
import SystemAdministrationSystemSettings from "@/views/systemAdministration/SystemSettings";

import AccountInfo from "@/views/account/Info";
import AccountController from "@/views/account/Controller";

import DocHelper from "@/views/doc/Helper";
import DocUserAgreement from "@/views/doc/UserAgreement";
import DocPrivacyPolicy from "@/views/doc/PrivacyPolicy";

import TestApi from "@/views/testPages/Api";
import TestForms from "@/views/testPages/Forms";
import TestAnyCode from "@/views/testPages/AnyCode";
import TestChildPage from "@/views/testPages/ChildPage";
import TestChild from "@/views/testPages/Child";
import TestRxJS from "@/views/testPages/RxJS";

import PageTemplate from "@/views/_template/PageTemplate";
import PageRequestTemplate from "@/views/_template/PageRequestTemplate";

import NotFound from "@/views/results/NotFound";
import NotAuthorized from "@/views/results/NotAuthorized";
import ServerError from "@/views/results/ServerError";

// -------------------------

import H5Booking from "@/views/h5/Booking";

export interface IRoute {
  title: string;
  path: string;
  code: string;

  hide?: boolean;
  icon?: ReactNode;
  element?: ReactNode;
  children?: IRoute[];
}

const routes: IRoute[] = [
  {
    hide: true,
    title: "登录",
    path: "/",
    code: "LOGIN",
    element: <Login />,
  },
  {
    hide: true,
    title: "H5",
    path: "/h5",
    code: "H5",
    element: <LayoutH5Blank />,
    children: [
      {
        title: "登录",
        path: "/h5/booking",
        code: "H5Booking",
        element: <H5Booking />,
      },
    ],
  },
  // 这咋给合并到一个，别用这种方式了
  {
    title: "首页",
    path: "/homepage",
    icon: <HomeFilled />,
    code: "HOME",
    element: <LayoutContainer />,
    children: [
      {
        title: "首页",
        path: "/homepage/home",
        code: "HOME",
        element: <HomepageHome />,
      },
    ],
  },
  {
    title: "账单查询",
    path: "/billingInquiries",
    code: "BILLINGINQUIRIES",
    icon: <FunnelPlotFilled />,
    element: <LayoutContainer />,
    children: [
      {
        title: "账单概览",
        path: "/billingInquiries/billingOverview",
        code: "BILLINGOVERVIEW",
        element: <BillingInquiriesBillingOverview />,
      },
      {
        title: "账单分析",
        path: "/billingInquiries/billingAnalysis",
        code: "BILLINGANALYSIS",
        element: <BillingInquiriesBillingAnalysis />,
      },
      {
        title: "账单明细",
        path: "/billingInquiries/billingDetails",
        code: "BILLINGDETAILS",
        element: <BillingInquiriesBillingDetails />,
      },
      // {
      //   title: "降本建议",
      //   path: "/billingInquiries/costReduction",
      //   code: "COSTREDUCTION",
      //   element: <BillingInquiriesCostReduction />,
      // },
    ],
  },
  {
    title: "成本优化",
    path: "/costOptimization",
    code: "COSTOPTIMIZATION",
    icon: <GoldOutlined />,
    element: <LayoutContainer />,
    children: [
      // {
      //   title: "健康度分析",
      //   path: "/costOptimization/healthAnalysis",
      //   code: "HEALTHANALYSIS",
      //   element: <CostOptimizationHealthAnalysis />,
      // },
      {
        title: "健康度分析",
        path: "/costOptimization/newHealthAnalysis",
        code: "HEALTHANALYSIS",
        element: <CostOptimizationNewHealthAnalysis />,
      },
      {
        title: "降本建议",
        path: "/costOptimization/optimizationProposal",
        code: "OPTIMIZATIONPROPOSAL",
        element: <CostOptimizationOptimizationProposal />,
      },
      {
        title: "优化策略",
        path: "/costOptimization/optimizationStrategy",
        code: "OPTIMIZATIONSTRATEGY",
        element: <CostOptimizationOptimizationStrategy />,
      },
    ],
  },
  {
    title: "账单管理",
    path: "/billingManagement",
    code: "BILLINGMANAGEMENT",
    icon: <HddFilled />,
    element: <LayoutContainer />,
    children: [
      {
        title: "自定义费用管理",
        path: "/billingManagement/customExpenseManagement",
        code: "CUSTOMEXPENSEMANAGEMENT",
        element: <BillingManagementCustomExpenseManagement />,
      },
      {
        title: "分摊规则管理",
        path: "/billingManagement/allocationRuleManagement",
        code: "ALLOCATIONRULEMANAGEMENT",
        element: <BillingManagementAllocationRuleManagement />,
      },
      {
        title: "预算管理",
        path: "/billingManagement/budgetManagement",
        code: "BUDGETMANAGEMENT",
        element: <BillingManagementBudgetManagement />,
      },
      {
        title: "账单推送",
        path: "/billingManagement/billPush",
        code: "BILLPUSH",
        element: <BillingManagementBillPush />,
      },
    ],
  },
  {
    title: "资源管理",
    path: "/resourceManagement",
    code: "RESOURCEMANAGEMENT",
    icon: <DropboxSquareFilled />,
    element: <LayoutContainer />,
    children: [
      {
        title: "层级管理",
        path: "/resourceManagement/hierarchicalManagement",
        code: "HIERARCHICALMANAGEMENT",
        element: <ResourceManagementHierarchicalManagement />,
      },
      {
        title: "应用管理",
        path: "/resourceManagement/applicationManagement",
        code: "APPLICATIONMANAGEMENT",
        element: <ResourceManagementApplicationManagement />,
      },
      {
        title: "资源列表",
        path: "/resourceManagement/resourceList",
        code: "RESOURCELIST",
        element: <ResourceManagementResourceList />,
      },
      {
        title: "集群管理",
        path: "/resourceManagement/clusterManagement",
        code: "CLUSTERMANAGEMENT",
        element: <ResourceManagementClusterManagement />,
      },
    ],
  },
  {
    title: "系统管理",
    path: "/systemAdministration",
    code: "SYSTEMADMINISTRATION",
    icon: <SettingFilled />,
    element: <LayoutContainer />,
    children: [
      {
        title: "用户管理",
        path: "/systemAdministration/userManagement",
        code: "USERMANAGEMENT",
        element: <SystemAdministrationUserManagement />,
      },
      {
        title: "云账号管理",
        path: "/systemAdministration/cloudAccountManagement",
        code: "CLOUDACCOUNTMANAGEMENT",
        element: <SystemAdministrationCloudAccountManagement />,
      },
      // {
      //   title: "健康度规则",
      //   path: "/systemAdministration/healthRules",
      //   code: "HEALTHRULES",
      //   element: <SystemAdministrationHealthRules />,
      // },
      {
        title: "任务管理",
        path: "/systemAdministration/taskManagement",
        code: "TASKMANAGEMENT",
        element: <SystemAdministrationTaskManagement />,
      },
      {
        title: "日志审计",
        path: "/systemAdministration/logAuditing",
        code: "LOGAUDITING",
        element: <SystemAdministrationLogAuditing />,
      },
      {
        title: "参数设置",
        path: "/systemAdministration/systemSettings",
        code: "SYSTEMSETTINGS",
        element: <SystemAdministrationSystemSettings />,
      },
    ],
  },
  {
    hide: true,
    title: "结果页",
    path: "/results",
    code: "RESULTS",
    element: <LayoutContainer />,
    children: [
      {
        title: "NotFound",
        path: "/results/404",
        code: "404",
        element: <NotFound />,
      },
      {
        title: "NotAuthorized",
        path: "/results/403",
        code: "403",
        element: <NotAuthorized />,
      },
      {
        title: "ServerError",
        path: "/results/500",
        code: "500",
        element: <ServerError />,
      },
    ],
  },
  {
    hide: true,
    title: "测试页面",
    path: "/testPages",
    code: "TESTPAGES",
    icon: <SlidersFilled />,
    element: <LayoutContainer />,
    children: [
      {
        title: "接口测试",
        path: "/testPages/api",
        code: "TESTPAGES:API",
        element: <TestApi />,
      },
      {
        title: "表单测试",
        path: "/testPages/forms",
        code: "TESTPAGES:FORMS",
        element: <TestForms />,
      },
      {
        title: "表单测试",
        path: "/testPages/anyCode",
        code: "TESTPAGES:ANYCODE",
        element: <TestAnyCode />,
      },
      {
        title: "子页面测试",
        path: "/testPages/childPage",
        code: "TESTPAGES:CHILDPAGE",
        element: <TestChildPage />,
      },
      {
        title: "子页面测试",
        path: "/testPages/childPage/child",
        code: "TESTPAGES:CHILDPAGE:CHILD",
        element: <TestChild />,
      },
      {
        title: "RXJS 测试",
        path: "/testPages/rxjs",
        code: "TESTPAGES:RXJS",
        element: <TestRxJS />,
      },
    ],
  },
  {
    hide: true,
    title: "模板页面",
    path: "/templates",
    code: "TEMPLATES",
    icon: <SlidersFilled />,
    element: <LayoutContainer />,
    children: [
      {
        title: "PAGE",
        path: "/templates/page",
        code: "TEMPLATES:PAGE",
        element: <PageTemplate />,
      },
      {
        title: "PAGEREQUEST",
        path: "/templates/pageRequest",
        code: "TEMPLATES:PAGEREQUEST",
        element: <PageRequestTemplate />,
      },
    ],
  },
  {
    hide: true,
    title: "账号",
    path: "/account",
    code: "ACCOUNT",
    element: <LayoutContainer />,
    children: [
      {
        title: "基本信息",
        path: "/account/info",
        code: "ACCOUNTINFO",
        element: <AccountInfo />,
      },
      {
        title: "访问控制",
        path: "/account/controller",
        code: "ACCOUNTCONTROL",
        element: <AccountController />,
      },
    ],
  },
  {
    hide: true,
    title: "文档",
    path: "/doc",
    code: "DOC",
    element: <LayoutBlank />,
    children: [
      {
        title: "帮助文档",
        path: "/doc/helper",
        code: "HELPER",
        element: <DocHelper />,
      },
      {
        title: "用户协议",
        path: "/doc/userAgreement",
        code: "USERAGREEMENT",
        element: <DocUserAgreement />,
      },
      {
        title: "隐私政策",
        path: "/doc/privacyPolicy",
        code: "PRIVACYPOLICY",
        element: <DocPrivacyPolicy />,
      },
    ],
  },
  {
    hide: true,
    title: "NotFound",
    path: "*",
    code: "NOTFOUND",
    element: <NotFound />,
  },
];

export default routes;
