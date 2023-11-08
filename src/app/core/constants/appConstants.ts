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
    static readonly issuerDetails ='analytics/getIssuerDetails';
    static readonly sectorDetails ='analytics/getSectorDetails';
    static readonly mostViewedDocByCountry ='analytics/getmostvieweddocumentbycountryandcity';
    static readonly visitorsData ='analytics/getVisitors';
    static readonly uniqueVisitors='analytics/getuniquevisitorsbydate';
    static readonly visitorsCountByCountry = 'analytics/getVisitorsCount';
    


    //POST Api's
    static readonly userlogin = 'user/login';

}