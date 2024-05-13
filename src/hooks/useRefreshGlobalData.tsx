import {
  dataDictionarysAPI,
  homeAPI,
  resourceManagementAPI,
  systemAdministrationAPI,
} from "@/api";
import { useGlobalStore } from "@/store";
import { pick } from "ramda";

const mapStateFromGlobal = pick(["updateGlobal"]);

const useRefreshGlobalData = () => {
  const global = useGlobalStore(mapStateFromGlobal);

  return () =>
    new Promise((resolve) => {
      const promises = [
        dataDictionarysAPI
          .getBussinessUnitCodeApportionLevels()
          .then((bussinessUnitCodeApportionLevels) => {
            global.updateGlobal({
              bussinessUnitCodeApportionLevels:
                bussinessUnitCodeApportionLevels || [],
            });
          }),
        dataDictionarysAPI.getApplicationTypes().then((applicationTypes) => {
          global.updateGlobal({ applicationTypes: applicationTypes || [] });
        }),
        dataDictionarysAPI
          .getCloudResourceResourceTags()
          .then((cloudResourceTypes) => {
            global.updateGlobal({
              cloudResourceTypes: cloudResourceTypes || [],
            });
          }),
        dataDictionarysAPI
          .getCloudResourcePlatforms()
          .then((cloudResourcePlatforms) => {
            global.updateGlobal({
              cloudResourcePlatforms: cloudResourcePlatforms || [],
            });
          }),
        dataDictionarysAPI
          .getCloudResourcePlatformsProductTypes()
          .then((cloudResourceTypesAndProductTypes) => {
            global.updateGlobal({
              cloudResourceTypesAndProductTypes:
                cloudResourceTypesAndProductTypes || [],
            });
          }),
        dataDictionarysAPI
          .getCloudResourceStates()
          .then((cloudResourceStates) => {
            global.updateGlobal({
              cloudResourceStates: cloudResourceStates || [],
            });
          }),
        resourceManagementAPI
          .getCustomResourcePlatformsProductTypes()
          .then((customResourcePlatformsAndTypes) => {
            global.updateGlobal({
              customResourcePlatformsAndTypes:
                customResourcePlatformsAndTypes || [],
            });
          }),
        dataDictionarysAPI.getAuditLogModules().then((auditLogModules) => {
          global.updateGlobal({ auditLogModules: auditLogModules || [] });
        }),
        dataDictionarysAPI
          .getAuditLogOperations()
          .then((auditLogOperations) => {
            global.updateGlobal({
              auditLogOperations: auditLogOperations || [],
            });
          }),
        dataDictionarysAPI
          .getBillManageApportionModel()
          .then((billManageApportionModel) => {
            const billManageApportionModelMap = (
              billManageApportionModel || []
            ).reduce(
              (pre, curr) => ({ ...pre, [curr.code]: curr.name }),
              {} as { [k: string]: string },
            );
            global.updateGlobal({
              billManageApportionModelMap: billManageApportionModelMap,
              billManageApportionModel: billManageApportionModel || [],
            });
          }),
        dataDictionarysAPI
          .getBillAnalysisBillType()
          .then((billAnalysisBillType) => {
            global.updateGlobal({
              billAnalysisBillType: billAnalysisBillType || [],
            });
          }),
        dataDictionarysAPI.getHealthLevels().then((healthLevels) => {
          global.updateGlobal({
            healthLevels:
              healthLevels.map((item) => ({
                code: item.code,
                name: `${item.name}（${item.lower} ~ ${item.upper}）`,
              })) || [],
          });
        }),
        dataDictionarysAPI.getOpenAccountStatus().then((openAccountStatus) => {
          global.updateGlobal({ openAccountStatus: openAccountStatus || [] });
        }),
        dataDictionarysAPI.getJobHandleStatus().then((jobHandleStatus) => {
          global.updateGlobal({ jobHandleStatus: jobHandleStatus || [] });
        }),
        dataDictionarysAPI.getJobHandleCodes().then((jobHandleCodes) => {
          global.updateGlobal({ jobHandleCodes: jobHandleCodes || [] });
        }),
        dataDictionarysAPI
          .getHealthAnalysisProcess()
          .then((healthAnalysisProcess) => {
            global.updateGlobal({
              healthAnalysisProcess: healthAnalysisProcess || [],
            });
          }),
        systemAdministrationAPI.getRoles().then((roles) => {
          global.updateGlobal({ roles: roles || [] });
        }),
        homeAPI
          .getRbacPermissionAuthorized()
          .then((rbacPermissionAuthorized) => {
            const _rbacPermissionAuthorized = rbacPermissionAuthorized || {
              componentCodeList: [],
              menuCodeList: [],
            };

            const componentCodeList =
              _rbacPermissionAuthorized.componentCodeList.map((code) =>
                code.toUpperCase(),
              );

            const menuCodeList = _rbacPermissionAuthorized.menuCodeList.map(
              (code) => code.toUpperCase(),
            );

            global.updateGlobal({
              componentCodeList: componentCodeList,
              menuCodeList: menuCodeList,
            });
          }),
        homeAPI.getAccountDetail().then((accountDetail) => {
          global.updateGlobal({ accountDetail: accountDetail || {} });
        }),
        homeAPI.getPackageUsage().then((packageUsage) => {
          global.updateGlobal({ packageUsage: packageUsage || {} });
        }),
        systemAdministrationAPI.getSettingRegions().then((regions) => {
          global.updateGlobal({ regions: regions || [] });
        }),
        dataDictionarysAPI.getBillPushTypeEnum().then((billPushType) => {
          global.updateGlobal({ billPushType: billPushType || [] });
        }),
        dataDictionarysAPI
          .getBillPushPushTypeEnum()
          .then((billPushPushType) => {
            global.updateGlobal({ billPushPushType: billPushPushType || [] });
          }),
      ];

      Promise.allSettled(promises).then(() => {
        resolve(true);
      });
    });
};

export default useRefreshGlobalData;
