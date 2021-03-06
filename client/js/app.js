function getSessionList(success, error) {
  //var soql = "SELECT Id, Name FROM Session_Speaker__c";
  var soql = "SELECT BillingStreet, ShippingStreet, BillingCity, ShippingCity, CreatedById, BillingPostalCode, ShippingPostalCode, Description, ShippingState, CreatedDate, LastModifiedDate, Id, ParentId, MasterRecordId, Name, BillingCountry, ShippingCountry, BillingState, Phone, Type FROM Account"
  force.query(soql, success, error);
}

function getSessionDetails(sessionId, success, error) {
  /*var soql = "SELECT Name, " +
  "Session_Date__c, " +
  "First_Name__c, " +
  "Last_Name__c " +
  "FROM Session_Speaker__c " +
  "WHERE Id = '" + sessionId + "'";*/
  var soql = "SELECT BillingStreet, "+
  "ShippingStreet, "+
  "BillingCity, "+
  "ShippingCity, "+
  "CreatedById, "+
  "BillingPostalCode, "+
  "ShippingPostalCode, "+
  "Description, "+
  "ShippingState, "+
  "CreatedDate, "+
  "LastModifiedDate, "+
  "Id, "+
  "ParentId, "+
  "MasterRecordId, "+
  "Name, "+
  "BillingCountry, "+
  "ShippingCountry, "+
  "BillingState, "+
  "Phone, "+
  "Type "+
  "FROM Account " +
  "WHERE Id = '" + sessionId + "'";
  force.query(soql, success, error);
}

function showSessionList() {
    getSessionList(
        function (data) {
            var sessions = data.records,
                html = '';
            for (var i=0; i<sessions.length; i++) {
                //html += '<li class="table-view-cell"><a href="#sessions/'+ sessions[i].Id +'">' + sessions[i].Name + '</a></li>';
                html += '<li class="table-view-cell"><a href="#sessions/'+ sessions[i].Id +'">' + sessions[i].Name + '</a></li>';
            }
            html =
                '<div class="page">' +
                '<header class="bar bar-nav">' +
                    '<h1 class="title">Sessions</h1>' +
                '</header>' +
                '<div class="content">' +
                    '<ul class="table-view session-list">' + html + '</ul>' +
                '</div>' +
                '</div>';
            slider.slidePage($(html));
        },
        function (error) {
            alert("Error: " + JSON.stringify(error));
        });
    return false;
}

function showSessionDetails(sessionId) {

    getSessionDetails(sessionId,
        function (data) {
            var session = data.records[0],
            html =
                '<div class="page">' +
                '<header class="bar bar-nav">' +
                '<a class="btn btn-link btn-nav pull-left" href="#"><span class="icon icon-left-nav"></span>Back</a>' +
            '<h1 class="title">Sessions</h1>' +
                '</header>' +
                '<div class="content">' +
                    '<div class="card">' +
                        '<ul class="table-view">' +
                            '<li class="table-view-cell">' +
                                '<h4>' + session.Name + '</h4>' +
                                //'<p>' + (session.Session_Date__c || 'No time yet')+ '</p>' +
                                '<p>' + (session.CreatedDate || 'No time yet')+ '</p>' +
                            '</li>' +
                            '<li class="table-view-cell">Speaker: ' +
                                //session.First_Name__c +
                                session.Description +
                            '</li>' +
                            '<li class="table-view-cell">' +
                                //(session.Description__c || 'No description yet') +
                                (session.ShippingStreet || 'No description yet') +
                            '</li>' +
                        '</ul>' +
                    '</div>' +
                '</div>' +
                '</div>';
            slider.slidePage($(html));
        },
        function (error) {
            alert("Error: " + JSON.stringify(error));
        });
    return false;
}

var slider = new PageSlider($('body')); // Initialize PageSlider micro-library for nice and hardware-accelerated page transitions
router.addRoute('', showSessionList);
router.addRoute('sessions/:id', showSessionDetails);
