package EntitiesTesting;
import static org.junit.Assert.*;

import java.sql.Timestamp;
import java.text.ParseException;
import java.util.Date;

import org.junit.Before;
import org.junit.Test;

import ie.sparehands.entities.*;

public class ApplicantTest {
	private final User OWNER = new User();
	private final User APPLICANT = new User();
	private final Job JOB = new Job();
	private final boolean STATUS = false;
	private Applicant applicant;

	@Before
	public void setUp() throws Exception {
		applicant = new Applicant();
	}

	@Test
	public void testParameteredConstructor() {
		applicant = new Applicant(OWNER, APPLICANT, JOB);
		applicant.getId();
		assertEquals(OWNER,applicant.getOwner());
		assertEquals(APPLICANT,applicant.getApplicant());
		assertEquals(JOB, applicant.getJob());
		assertEquals(STATUS, applicant.getStatus());
	}
	
	@Test
	public void testSetStatus(){
		applicant.setStatus("confirmed");
		assertEquals("confirmed",applicant.getStatus());
	}
}
