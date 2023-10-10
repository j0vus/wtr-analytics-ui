export class AppConsts {
    //GET Api's
    static readonly userAll = 'analytics/all/userStats';
    static readonly chartData = 'analytics/all/visitor/datewise';
    static readonly companyVisitChart = 'analytics/getCompanyVisitedReport';
    static readonly companyTimeChart = 'analytics/getCompanyTimeSpendReport';
    static readonly industryVisitChart ='analytics/getIndustryUserVisitReport';
    static readonly industryTimeChart = 'analytics/getIndustryTimeSpendReport';
    static readonly sessionDetails = 'analytics/visitor';
    static readonly issuersAll = 'issuer/all';
    static readonly sectorsAll = 'industry/all';
    static readonly companyDetails ='analytics/getSectorDetails';
    static readonly sectorDetails ='analytics/getCompanyDetails';
    static readonly mostViewedDocByCountry ='analytics/getmostvieweddocumentbycountryandcity';


    //POST Api's
    static readonly userlogin = 'user/login';

}