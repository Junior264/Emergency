package de.ewald.worker.sms;

import org.springframework.web.bind.annotation.RestController;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

@RestController
public class SmsController {
    @GetMapping("/sendSMS")
    @ResponseStatus(HttpStatus.OK)
    public String sendSMS() {
        final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
        final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

            Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
            String testNumber = "+15558675310";
            String receiveNumber = "+15017122661";

            
            Message message = Message.creator(
                new PhoneNumber(testNumber),
                new PhoneNumber(receiveNumber),
                "Your message")
            .create();

            System.out.println(message.getSid());

            return "Message sent succesfully";
        }
    
}
