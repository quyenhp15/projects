import java.awt.BorderLayout;
import java.awt.EventQueue;

import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;
import javax.swing.JLabel;
import javax.swing.JOptionPane;

import java.awt.Font;
import javax.swing.JTextField;
import javax.swing.JPasswordField;
import javax.swing.JButton;
import java.awt.Color;
import java.awt.event.ActionListener;
import java.sql.SQLException;
import java.awt.event.ActionEvent;

public class ChangePassword extends JFrame {

	private JPanel contentPane;
	private JPasswordField currentField;
	private JPasswordField newField;
	private JPasswordField confirmField;

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					ChangePassword frame = new ChangePassword();
					frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

	/**
	 * Create the frame.
	 */
	public ChangePassword() {
		setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
		setBounds(100, 100, 600,400);
		setVisible(true);
		
		contentPane = new JPanel();
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
		setContentPane(contentPane);
		contentPane.setLayout(null);
		
		JLabel currentPassLabel = new JLabel("Please enter your current password");
		currentPassLabel.setFont(new Font("Tahoma", Font.PLAIN, 20));
		currentPassLabel.setBounds(42, 82, 326, 28);
		contentPane.add(currentPassLabel);
		
		currentField = new JPasswordField();
		currentField.setFont(new Font("Tahoma", Font.ITALIC, 15));
		currentField.setBounds(52, 121, 200, 20);
		contentPane.add(currentField);
		
		JLabel newPassLabel = new JLabel("New password");
		newPassLabel.setBackground(new Color(0, 128, 0));
		newPassLabel.setFont(new Font("Tahoma", Font.PLAIN, 20));
		newPassLabel.setBounds(42, 166, 326, 28);
		contentPane.add(newPassLabel);
		
		JLabel confirmPassLabel = new JLabel("Confirm password");
		confirmPassLabel.setBackground(new Color(0, 128, 0));
		confirmPassLabel.setFont(new Font("Tahoma", Font.PLAIN, 20));
		confirmPassLabel.setBounds(42, 260, 326, 28);
		contentPane.add(confirmPassLabel);
		
		newField = new JPasswordField();
		newField.setFont(new Font("Tahoma", Font.ITALIC, 15));
		newField.setBounds(52, 205, 200, 20);
		contentPane.add(newField);
		
		confirmField = new JPasswordField();
		confirmField.setFont(new Font("Tahoma", Font.ITALIC, 15));
		confirmField.setBounds(52, 299, 200, 20);
		contentPane.add(confirmField);
		
		JButton btnChangePassword = new JButton("Change password");
		btnChangePassword.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e){
				int i;
				if(currentField.getText().equals(LoginFrame.user.getPassword())) i=0;
				else{
					JOptionPane.showMessageDialog(null, "Incorrect password");
					return;
				}
				
				if(newField.getText().equals("")) JOptionPane.showMessageDialog(null, "Your password can not be empty");
				else if(newField.getText().equals(confirmField.getText())) i=0;
				else JOptionPane.showMessageDialog(null, "Your password and confirm password are different");
				
				if(i==1) {
					Menu.Update("UPDATE Authentication_login SET userpassword = '"+newField.getText()+"' WHERE username = '"+LoginFrame.user.getUsername()+"';");
					JOptionPane.showMessageDialog(null, "Change password finish");
					dispose();
				}
			}
		});
		btnChangePassword.setFont(new Font("Tahoma", Font.BOLD, 17));
		btnChangePassword.setBackground(new Color(107, 142, 35));
		btnChangePassword.setBounds(353, 186, 206, 53);
		contentPane.add(btnChangePassword);
	}
}
