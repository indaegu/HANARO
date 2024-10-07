<%@ page session="true" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>

<head>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/auth-complete.css">
    <title>인증 완료</title>
</head>
<body>
<div class="popup-container">
    <div class="popup">
        <div class="popup-content">
            <img src="${pageContext.request.contextPath}/img/check-green.png" alt="Check Icon">
            <h2>본인인증을 완료하였습니다!</h2>
            <p>아래 버튼을 눌러 기존 페이지로 돌아가주세요.</p>
            <br>
        </div>
        <button id="homeButton">홈으로</button>
    </div>
</div>


<script>
    var homeButton = document.getElementById('homeButton');
    <%--var approvals = [];--%>

    <%--<c:forEach var="approval" items="${approvals}">--%>
    <%--approvals.push({--%>
    <%--    approvalNumber: "${approval.approvalNumber}",--%>
    <%--    approvalDate: "${approval.approvalDate}",--%>
    <%--    approvalAmount: "${approval.approvalAmount}",--%>
    <%--    benefitAmount: "${approval.benefitAmount}",--%>
    <%--    customerCard: "${approval.customerCard}",--%>
    <%--    merchantId: "${approval.merchantId}",--%>
    <%--    approvalStatusCode: "${approval.approvalStatusCode}",--%>
    <%--    paymentCategoryCode: "${approval.paymentCategoryCode}"--%>
    <%--});--%>
    <%--</c:forEach>--%>

    homeButton.addEventListener('click', function () {
        // 부모 창의 URL을 변경하고 팝업 창을 닫습니다.

        window.opener.postMessage({
            status: 'success',
        }, "*");  // 부모 창의 도메인을 명시
        window.close();
    });
</script>
</body>
</html>
