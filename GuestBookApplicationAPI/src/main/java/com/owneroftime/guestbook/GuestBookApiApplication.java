package com.owneroftime.guestbook;

import com.owneroftime.guestbook.api.repository.GuestBookEntryRepository;
import com.owneroftime.guestbook.security.repository.UserDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class GuestBookApiApplication implements CommandLineRunner {

	@Autowired
	private GuestBookEntryRepository guestBookEntryRepository;

	@Autowired
	private UserDetailsRepository userDetailsRepository;

	public static void main(String[] args) {
		SpringApplication.run(GuestBookApiApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
//		userDetailsRepository.deleteAll();;
//		UserEntity userEntity = new UserEntity();
//		userEntity.setEmail("email");
//		userEntity.setPassword(new BCryptPasswordEncoder().encode("pass"));
//		userDetailsRepository.save(userEntity);
//
//		GuestBookEntryEntity guestBookEntryEntity = new GuestBookEntryEntity();
//		guestBookEntryEntity.setGuestBookEntryText("Test");
//		guestBookEntryEntity.setGuestBookEntryStatus(1L);
//		guestBookEntryEntity.setUserEntity(userEntity);
//		guestBookEntryRepository.save(guestBookEntryEntity);
	}
}
