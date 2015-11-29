//package integrationTesting;
//
//import static org.junit.Assert.assertEquals;
//import static org.junit.Assert.assertNotNull;
//import static org.junit.Assert.assertNotSame;
//
//import java.sql.Timestamp;
//import java.util.Date;
//
//import javax.inject.Inject;
//
//import static org.junit.Assert.assertEquals;
//import static org.junit.Assert.assertNotNull;
//import static org.junit.Assert.assertNotSame;
//import java.text.ParseException;
//import javax.inject.Inject;
//import org.jboss.arquillian.container.test.api.Deployment;
//import org.jboss.arquillian.junit.Arquillian;
//import org.jboss.arquillian.junit.InSequence;
//import org.jboss.shrinkwrap.api.Archive;
//import org.jboss.shrinkwrap.api.ShrinkWrap;
//import org.jboss.shrinkwrap.api.asset.EmptyAsset;
//import org.jboss.shrinkwrap.api.spec.WebArchive;
//import org.junit.Before;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//
//import ie.sparehands.daos.UserDAO;
//import ie.sparehands.entities.User;
//
//@RunWith(Arquillian.class)
//public class UserTest {
//
//	private User newUser;
//
//	@Deployment
//	public static Archive<?> createDeployment() {
//
//		final WebArchive war = ShrinkWrap.create(WebArchive.class, "test.war")
//				.addPackage(ie.sparehands.daos.UserDAO.class.getPackage())
//				.addAsResource("META-INF/persistence.xml")
//				.addAsWebInfResource(EmptyAsset.INSTANCE, "beans.xml");
//		return war;
//	}
//	
//	@Inject
//	private UserDAO userDAO;
//	
//	@Before
//	public void setup() {
//		newUser = new User(); 
//		newUser.setForename("John");
//		newUser.setSurname("Doe");
//		newUser.setEmail("jdoe@gmail.com");
//		newUser.setDob((Timestamp) new Date("19/09/1991"));
//		newUser.setPassword("pass");
//		newUser.setPicture_url("blah");
//	}
//	
//	@Test
//	@InSequence(1)
//	public void testCreateNewUser() throws Exception {
//		System.out.println("Creating new User...");
//		userDAO.save(newUser);
//		assertNotNull(newUser.getId()); 
//		userDAO.delete(newUser.getId());
//	}
//	
//	@Test
//	@InSequence(2)
//	public void testGetUserDetails() throws Exception {
//		userDAO.save(newUser);
//		final User dummyUser = userDAO.getUserByEmail("jdoe@gmail.com");
//
//		assertEquals(dummyUser.getForename(), newUser.getForename()); 
//		assertEquals(dummyUser.getSurname(), newUser.getSurname()); 
//		assertEquals(dummyUser.getEmail(), newUser.getEmail()); 
//		assertEquals(dummyUser.getDob(), newUser.getDob()); 
//		assertEquals(dummyUser.getPassword(), newUser.getPassword()); 
//		assertEquals(dummyUser.getPicture_url(), newUser.getPicture_url()); 
//		userDAO.delete(newUser.getId());
//	}
//	
//	@Test
//	@InSequence(3)
//	public void testUpdateUserDetails() throws Exception {
//		final String oldEmail = newUser.getEmail();
//		userDAO.save(newUser);
//
//		final User dummyUser = userDAO.getUserByEmail("jdoe@gmail.com");
//		dummyUser.setEmail("johndoe@yahoo.com");
//		userDAO.update(dummyUser);
//
//		assertNotSame(oldEmail, userDAO.getUserByEmail("johndoe@yahoo.com").getEmail());
//		userDAO.delete(newUser.getId());
//	}
//	
//	@Test
//	@InSequence(4)
//	public void testGetUserByEmail() throws Exception {
//		userDAO.save(newUser);
//
//		assertNotNull(userDAO.getUserByEmail("jdoe@gmail.com")); 
//		userDAO.delete(newUser.getId());
//	}
//	
//	@Test
//	@InSequence(5)
//	public void testGetAllUsers() throws Exception {
//		final int totalUsers = userDAO.getAllUsers().size();
//		System.out.println("Total Users in DB: "+totalUsers);
//		userDAO.save(newUser);
//
//		final int totalUsersPlusOne = userDAO.getAllUsers().size();
//		System.out.println("Total Users in DB after insert: "+totalUsersPlusOne);
//
//		assertNotSame(totalUsers, totalUsersPlusOne);
//		userDAO.delete(newUser.getId());
//	}
//}
