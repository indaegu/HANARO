<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <title>2차 본인인증</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <!-- CryptoJS 라이브러리 -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>
    <!-- SweetAlert2 라이브러리 -->
    <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.js"></script>
    <script>
      $(document).ready(function () {
        function updateSendButtonStatus() {
          var phoneNumber = $("#phoneNumber").val();
          var allCheckboxes = $('.checkbox-group input[type="checkbox"]');
          var allChecked = allCheckboxes.length === allCheckboxes.filter(':checked').length;

          $('#selectAll').prop('checked', allChecked);

          if (phoneNumber.length === 11 && /^\d+$/.test(phoneNumber) && allChecked) {
            $("#sendButton").removeClass("disabled").prop('disabled', false);
          } else {
            $("#sendButton").addClass("disabled").prop('disabled', true);
          }
        }

        $('#selectAll').change(function () {
          $('.checkbox-group input[type="checkbox"]').prop('checked', $(this).is(':checked'));
          updateSendButtonStatus();
        });

        $('.checkbox-group input[type="checkbox"]').change(function () {
          updateSendButtonStatus();
        });

        $("#phoneNumber").on("input", function () {
          updateSendButtonStatus();
        });

        $("#sendButton").click(function (event) {
          if ($(this).hasClass("disabled")) {
            event.preventDefault();
          } else {
            $("#sendForm").submit();
          }
        });

        $(".consent-label").click(function () {
          var pdfUrl = $(this).data("pdf-url");

          if (pdfUrl) {
            console.log("PDF URL:", pdfUrl);
            var content = `<iframe src="\${pdfUrl}" style="width:100%; height:100%;" frameborder="0" allowfullscreen></iframe>`;
            showPDFModal(content);
          } else {
            alert("PDF 문서가 없습니다.");
          }
        });

        function showPDFModal(content) {
          $("#modalMessage").html(content);
          $("#myModal").css('display', 'flex');
        }

        function showModal(message) {
          Swal.fire({
            title: '알림',
            text: message,
            icon: 'success',
            confirmButtonText: '확인'
          });
        }



        $(".close").click(function () {
          $("#myModal").css('display', 'none');
        });

        $(window).click(function (event) {
          if ($(event.target).is('#myModal')) {
            $("#myModal").css('display', 'none');
          }
        });

        $("#sendButton").click(function (event) {
          event.preventDefault();
          if (!$(this).hasClass("disabled")) {
            $.ajax({
              type: "POST",
              url: "${pageContext.request.contextPath}/api/oauth/send",
              data: {
                phoneNumber: $("#phoneNumber").val(),
                name: $("#name").val(),
                birthDate: $("#birthDate").val(),
                idNumber: $("#idNumber").val()
              },
              success: function (response) {
                $("#sendButton").text("재전송");
                $("#verifyPhoneNumber").val($("#phoneNumber").val());
                showModal("인증 번호가 전송되었습니다.");
              },
              error: function (xhr, status, error) {
                showModal("인증 번호 전송에 실패하였습니다.");
              }
            });
          }
        });

        $("#sendForm").on("submit", function (event) {
          event.preventDefault();
        });

        $("#verifyForm").submit(function (event) {
          event.preventDefault();
          $.ajax({
            type: "POST",
            url: "${pageContext.request.contextPath}/api/oauth/verify",
            data: {
              phoneNumber: $("#verifyPhoneNumber").val(),
              code: $("#code").val()
            },
            success: function (response) {
              console.log(response);
              if (response === true) {
                $("#verifyResponse").text("Verification successful");
                $("#nextButton").removeClass("disabled");
                showModal("인증 완료");
              } else {
                $("#verifyResponse").text("Verification failed");
                showModal("인증 번호가 올바르지 않습니다.");
              }
            },
            error: function () {
              $("#verifyResponse").text("An error occurred during verification");
              showModal("인증 중 오류가 발생하였습니다.");
            }
          });
        });

        $("#nextButton").click(function () {
          console.log("click");
          if (!$(this).hasClass("disabled")) {
            const params = new URLSearchParams(window.location.search);
            const responseType = "code";
            const clientId = params.get('client_id');
            const redirectUri = params.get('redirect_uri');
            const scope = params.get('scope');
            const state = params.get('state');

            // CI 생성 로직
            const combinedString = $("#birthDate").val() + '-' + $("#idNumber").val();
            let CI = CryptoJS.SHA512(combinedString).toString(CryptoJS.enc.Hex).toUpperCase();
            const encodedCI = encodeURIComponent(CI);
            console.log(CI);
            // 사용자 정보와 CI를 서버에 전송하여 등록 또는 인증 수행
            $.ajax({
              type: "POST",
              url: "${pageContext.request.contextPath}/api/oauth/authenticate",
              data: {
                phoneNumber: $("#phoneNumber").val(),
                birthDate: $("#birthDate").val(),
                idNumber: $("#idNumber").val(),
                ci: CI
              },
              success: function (response) {
                if (response.isAuthenticated === true) {
                  // Authorization Code를 요청하는 URL로 리다이렉트 (CI 포함)
                  console.log(response);
                  window.location.href = `https://mydata-auth-server.site:8443/oauth2-0.0.1-SNAPSHOT/auth-complete?hashed-auth=`
                      + response.ci;
                } else {
                  showModal("인증에 실패했습니다.");
                }
              },
              error: function (error) {
                console.log('Error during verification:', error);
                $("#verifyResponse").text("인증 중 오류가 발생했습니다.");
                showModal("인증 중 오류가 발생했습니다.");
              }
            });
          }
        });
      });
    </script>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap');

      body {
        margin: 0;
        padding: 0;
        background-color: #f7f9fc;
        font-family: 'Noto Sans KR', sans-serif;
        height: 100%;
        width:100%;
      }

      .container {
        margin: 0 auto;
        padding: 40px 50px;
        background-color: #fff;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .logo {
        text-align: center;
        margin-bottom: 20px;
      }

      .logo img {
        height: 80px;
      }

      .form-group {
        margin-bottom: 25px;
        position: relative;
      }

      .form-group label {
        display: block;
        margin-bottom: 8px;
        font-weight: bold;
        color: #333;
      }

      .form-group input[type="text"],
      .form-group input[type="password"] {
        width: 100%;
        padding: 12px 16px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
        box-sizing: border-box;
      }

      .form-group .input-group {
        display: flex;
        align-items: center;
      }

      .form-group .input-group input {
        flex: 1;
      }

      .form-group .input-group input + input {
        margin-left: 10px;
      }

      .form-group .input-group span {
        margin: 0 5px;
        font-size: 18px;
      }

      .form-group button {
        width: 100%;
        padding: 12px;
        background-color: rgba(62, 191, 171, 1);
        color: #fff;
        border: none;
        border-radius: 4px;
        font-size: 18px;
        cursor: pointer;
      }

      .form-group button.disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }

      .checkbox-group {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
      }

      .checkbox-group input[type="checkbox"] {
        margin-right: 10px;
        width: 18px;
        height: 18px;
      }

      .checkbox-group label {
        flex: 1;
        cursor: pointer;
        position: relative;
      }

      .consent-label {
        text-decoration: underline;
        color: #007aff;
      }

      .form-actions {
        display: flex;
        justify-content: space-between;
      }

      .form-actions button {
        width: 48%;
        background-color: rgba(62, 191, 171, 1);
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 18px;
        cursor: pointer;
        padding: 12px;
      }

      .form-actions button.disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }

      /* 모달 스타일 */
      .modal {
        display: none;
        align-items: center;
        justify-content: center;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
      }

      .modal-content {
        background-color: white;
        padding: 20px;
        border-radius: 6px;
        width: 90%;
        min-width: 600px;
        min-height: calc(80vh + 45px);
        /*overflow: auto;*/
        position: relative;
      }

      .modal-content .close {
        position: absolute;
        top: 15px;
        right: 20px;
        font-size: 24px;
        cursor: pointer;
      }

      .modal-content iframe {
        width: 100% !important;
        height: 80vh !important;
        position: relative;
        top: 40px;
        border: none;
      }

      #modalMessage{
      }

      @media (max-width: 600px) {
        .form-group button {
          font-size: 16px;
        }


      }
    </style>
</head>
<body>

<div class="container">
    <div class="logo">
        <img src="${pageContext.request.contextPath}/img/logo192.png" alt="하나 로고 이미지"/>
    </div>
    <div class="form-group">
        <label for="name">이름</label>
        <input type="text" id="name" name="name" placeholder="이름을 입력해 주세요." required>
    </div>
    <div class="form-group">
        <label for="birthDate">주민등록 번호</label>
        <div class="input-group">
            <input type="text" id="birthDate" name="birthDate" placeholder="앞 6자리" required>
            <span>-</span>
            <input type="password" id="idNumber" name="idNumber" placeholder="뒤 7자리" required>
        </div>
    </div>

    <div class="form-group">
        <div class="checkbox-group">
            <input type="checkbox" id="selectAll" name="selectAll">
            <label for="selectAll">약관 전체 동의</label>
        </div>
        <div class="checkbox-group">
            <input type="checkbox" id="personalInfoConsent" name="personalInfoConsent">
            <label for="personalInfoConsent" class="consent-label"
                   data-pdf-url="${pageContext.request.contextPath}/pdf/user-identification-consent.pdf">개인 정보 이용 동의</label>
        </div>
        <div class="checkbox-group">
            <input type="checkbox" id="ciUseConsent" name="ciUseConsent">
            <label for="ciUseConsent" class="consent-label"
                   data-pdf-url="${pageContext.request.contextPath}/pdf/user-identification-consent.pdf">연계정보(CI)</label>
        </div>
    </div>

    <div class="form-group">
        <label for="phoneNumber">휴대폰번호</label>
        <input type="text" id="phoneNumber" name="phoneNumber" placeholder="'-'없이 숫자만 입력해 주세요."
               required>
    </div>
    <div class="form-group">
        <button type="submit" id="sendButton" form="sendForm" class="disabled">인증번호 전송</button>
    </div>

    <div class="form-group">
        <label for="code">인증번호</label>
        <input type="text" id="code" name="code" placeholder="인증번호를 입력해 주세요." required>
    </div>
    <div class="form-group">
        <button type="submit" form="verifyForm">인증번호 확인</button>
    </div>

    <p id="verifyResponse" style="display:none;"></p>

    <form id="sendForm" style="display: none;"></form>
    <form id="verifyForm" style="display: none;">
        <input type="hidden" id="verifyPhoneNumber" name="phoneNumber">
    </form>

    <div class="form-actions">
        <button id="cancelButton">취소</button>
        <button id="nextButton" class="disabled">다음</button>
    </div>
</div>

<div id="myModal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <div id="modalMessage"></div>
    </div>
</div>
</body>
</html>
