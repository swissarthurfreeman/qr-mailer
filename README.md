Since we're using the latest angular version, we're switching to default everything is standalone paradigm,
as described in [this blog post](https://blog.angular.dev/the-future-is-standalone-475d7edbc706).

Run backend with `.\mvnw.cmd spring-boot:run`.

Encode URL to QR code with test URL `http://host-url/mailer/new-ticket/?type=Printer&code=IO3689&loca=RA-N1-O-165&SN=29JSN83` on [QR Code Generator](https://www.qr-code-generator.com/).