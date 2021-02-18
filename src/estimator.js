const covid19ImpactEstimator = (userData) => {
    // Object for property collection
    userData = {
        data:{},
        estimate: {
            impact:{},
            severeImpact:{}
        }
    }

    //  We handle the data as an onject to the function 
    data = () => {
        userData['data'] = {
                region: {
                name: "Africa",
                avgAge: 19.7,
                avgDailyIncomeInUSD: 5,
                avgDailyIncomePopulation: 0.71
                },
                periodType: "days",
                timeToElapse: 58,
                reportedCases: 674,
                population:  66622705,
                totalhospitalBeds: 1380614
            };
    }
    data();
    /* 
       Unpack the property of region and data object as 
       variable so that their accessible
    */
   let { 
        avgDailyIncomeInUSD,
        avgDailyIncomePopulation
    } = userData['data']['region']
    let {
        periodType,
        timeToElapse,
        reportedCases,
        totalhospitalBeds
    } = userData['data'];

    // Function for handling change in period Type
    const conditional = () => {
        if(periodType === 'months') {
            timeToElapse *= 30;
        } else if (periodType === "weeks") {
            timeToElapse *= 7;
        }
    }
    conditional();
    // Computation for impact
    const impactEStimate = () => {
        /* 
         currentlyInfected x (2 to the power of *factor*) where factor is 9 
         for a 28 day duration (there are 9 sets of 3 days in a period of 28 days)
        */
       let div = Math.trunc(timeToElapse / 3);
       let day = Math.pow(2,div);
        /*
          set and Unpack the property of the severe Impact object
          into distinct variables
        */
        let {
            currentlyInfected,
            infectionsByRequestedTime,
            severeCasesByRequestedTime,
            hospitalBedsByRequestedTime,
            casesForICUCareByRequestedTime,
            casesForVentilatorByRequestedTime,
            dollarsInFlight
        } = userData['estimate']['impact'];

        // Computation for properties for imapct
        const Computations = () => {
            currentlyInfected = (reportedCases * 10);
            infectionsByRequestedTime = Math.trunc(currentlyInfected * day);
            severeCasesByRequestedTime = 
            Math.trunc(infectionsByRequestedTime * (15 / 100));
            hospitalBedsByRequestedTime = 
            Math.trunc((totalhospitalBeds * (35/100)) - severeCasesByRequestedTime);
            casesForICUCareByRequestedTime = 
            Math.trunc(infectionsByRequestedTime * (5 / 100));
            casesForVentilatorByRequestedTime = 
            Math.trunc((2 / 100) * infectionsByRequestedTime);
            dollarsInFlight = Math.trunc((infectionsByRequestedTime * 
                                          avgDailyIncomePopulation * 
                                          avgDailyIncomeInUSD) / timeToElapse);
            userData['estimate']['impact'] =  {
                currentlyInfected,
                infectionsByRequestedTime,
                severeCasesByRequestedTime,
                hospitalBedsByRequestedTime,
                casesForICUCareByRequestedTime,
                casesForVentilatorByRequestedTime,
                dollarsInFlight
        }
    }
    Computations();
}
impactEStimate();
        // Computation for severe Impact
        const severeImpact = () => {
            /*
              conditional statements  
            */
            let div = Math.trunc(timeToElapse / 3);
            let day = Math.pow(2,div);
            /*
              set and Unpack the property of the severe Impact object
              into distinct variables
            */
            let {
                currentlyInfected,
                infectionsByRequestedTime,
                severeCasesByRequestedTime,
                hospitalBedsByRequestedTime,
                casesForICUCareByRequestedTime,
                casesForVentilatorByRequestedTime,
                dollarsInFlight
            } = userData['estimate']['severeImpact'];

            // Computaions for the property of 
            const Computations = () => {
                currentlyInfected = (reportedCases * 50);
                infectionsByRequestedTime = Math.trunc(currentlyInfected * day);
                severeCasesByRequestedTime =  
                Math.trunc(infectionsByRequestedTime * (15 / 100));
                hospitalBedsByRequestedTime = 
                Math.trunc((totalhospitalBeds * (35/100)) - severeCasesByRequestedTime);
                casesForICUCareByRequestedTime = 
                Math.trunc(infectionsByRequestedTime * (5 / 100));
                casesForVentilatorByRequestedTime = 
                Math.trunc(infectionsByRequestedTime * (2 / 100));
                dollarsInFlight = 
                Math.trunc((infectionsByRequestedTime * 
                            avgDailyIncomePopulation * avgDailyIncomeInUSD) / 
                            timeToElapse);
                userData['estimate']['severeImpact'] =  {
                currentlyInfected,
                infectionsByRequestedTime,
                severeCasesByRequestedTime,
                hospitalBedsByRequestedTime,
                casesForICUCareByRequestedTime,
                casesForVentilatorByRequestedTime,
                dollarsInFlight
            }
        }
        Computations()
    }
        severeImpact();
    return userData;
}
console.log(covid19ImpactEstimator());
