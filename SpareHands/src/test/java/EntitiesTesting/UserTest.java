package EntitiesTesting;
import static org.junit.Assert.*;
import ie.sparehands.entities.*;

import java.util.Date;

import org.junit.Before;
import org.junit.Test;


public class UserTest {
	private final String FNAME = "Sam";
	private final String SNAME = "Power";
	private final String EMAIL = "sam@gmail.com";
	private final String PASSWORD = "password";
	private final Date DOB = new Date();
	private final String PICTUREURL = "resources/img/userProfiles/stock.jpg";
	private User user;
	
	@Before
	public void setUp() throws Exception {
		user = new User();
	}

	@Test
	public void testParameteredConstructor() {
		user = new User(FNAME,SNAME,EMAIL,PASSWORD,DOB,"");
		user.getId();
		assertEquals(FNAME, user.getForename());
		assertEquals(SNAME, user.getSurname());
		assertEquals(EMAIL, user.getEmail());
		assertEquals(PASSWORD, user.getPassword());
		assertEquals(DOB, user.getDob());
		assertEquals(PICTUREURL, user.getPicture_url());
	}
	
	@Test
	public void testConstructorSetsStockPhoto() {
		user = new User(FNAME,SNAME,EMAIL,PASSWORD,DOB,PICTUREURL);
		assertEquals(FNAME, user.getForename());
		assertEquals(SNAME, user.getSurname());
		assertEquals(EMAIL, user.getEmail());
		assertEquals(PASSWORD, user.getPassword());
		assertEquals(DOB, user.getDob());
		assertEquals(PICTUREURL, user.getPicture_url());
	}

	@Test
	public void testForenameSetterAndGetter() {
		user.setForename(FNAME);
		assertEquals(FNAME, user.getForename());	
	}
	
	@Test
	public void testSurnameSettersAndGetters() {
		user.setSurname(SNAME);
		assertEquals(SNAME, user.getSurname());	
	}
	
	@Test
	public void testEmailSetterAndGetter() {
		user.setEmail(EMAIL);
		assertEquals(EMAIL, user.getEmail());
	}
	
	@Test
	public void testPasswordSetterAndGetter() {
		user.setPassword(PASSWORD);
		assertEquals(PASSWORD, user.getPassword());		
	}
	
	@Test
	public void testPictureURLSetterAndGetter() {
		user.setPicture_url(PICTUREURL);
		assertEquals(PICTUREURL, user.getPicture_url());
		
	}
}
