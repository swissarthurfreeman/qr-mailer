Since we're using the latest angular version, we're switching to default everything is standalone paradigm,
as described in [this blog post](https://blog.angular.dev/the-future-is-standalone-475d7edbc706).

Run backend with `.\mvnw.cmd spring-boot:run`.

Encode URL to QR code with test URL `http://host-url/mailer/new-ticket/?type=Printer&code=IO3689&loca=RA-N1-O-165&SN=29JSN83` on [QR Code Generator](https://www.qr-code-generator.com/).

`http://host-url/mailer/new-ticket/%3Ftype%3Dprinter&code%3DIO3689&loca%3DRA-N1-O-165&SN%3D29JSN83`
`http://host-url/mailer/new-ticket/%3Ftype%3Dmeeting_room&loca%3DRA-N1-O-165``

### HTTPS, `getUserMedia()`

You need the following exception added to your browser to be able to use getUserMedia() if you're not
serving your website via HTTPS : (under edge|chrome://flags)

![alt text](user-media-conf.png)