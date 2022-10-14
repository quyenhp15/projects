
import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.EventQueue;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.SwingConstants;
import javax.swing.Timer;
import javax.swing.border.EmptyBorder;


public class Goodbye extends JFrame {

	private JPanel contentPane;

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		
	}

	/**
	 * Create the frame.
	 * 
	 * @throws InterruptedException
	 */
	public Goodbye() throws InterruptedException {
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setBounds(100, 100, Window.getW(), Window.getH());
		setUndecorated(true);
		contentPane = new JPanel();
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
		contentPane.setLayout(new BorderLayout(0, 0));
		contentPane.setBackground(new Color(255, 250, 205));
		setExtendedState(JFrame.MAXIMIZED_BOTH);
		setContentPane(contentPane);
		
		int delay = 2000; //milliseconds
		  ActionListener taskPerformer = new ActionListener() {
		      public void actionPerformed(ActionEvent evt) { 
		      Window.switchPane(new Welcome());
		      dispose();
		      }
		  };
		  
		  Timer t= new Timer(delay, taskPerformer);
		  t.setRepeats(false);
		  t.start();

		JLabel lblThankYou = new JLabel();
		switch (LoginFrame.user.getRole()) {
		case "Customer":
			lblThankYou.setText("Thank you for choosing us!");
			break;
		default:
			lblThankYou.setText("Have a nice day");
			break;
		}
		lblThankYou.setForeground(new Color(50, 205, 100));
		lblThankYou.setFont(new Font("Harlow Solid Italic", Font.ITALIC, 100));
		lblThankYou.setHorizontalAlignment(SwingConstants.CENTER);
		add(lblThankYou);

	}

}
