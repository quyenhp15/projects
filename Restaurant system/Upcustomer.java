import java.awt.BorderLayout;
import java.awt.EventQueue;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;
import java.sql.*;
import javax.swing.JButton;
import javax.swing.JTextField;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.SwingConstants;
import java.awt.Color;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;
import javax.swing.border.BevelBorder;
import java.awt.Font;
import javax.swing.border.SoftBevelBorder;

import net.proteanit.sql.DbUtils;

import javax.swing.ImageIcon;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

public class Upcustomer extends JFrame {

	private JPanel contentPane;
	private JTextField newpass;
	private JTextField newname;
	private JTextField newaddress;
	private JTextField account;

	private JTextField txtDone;
	private JButton btnNewButton_3;
	private static Connection c;
	private JLabel lblNewLabel;
    private JLabel labelback;
	/**
	 * Launch the application.
	 */
	public static void main(String[] args) throws SQLException {
		
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					Upcustomer upcus = new Upcustomer();
					upcus.setUndecorated(true);
					upcus.setVisible(true);
					
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

	public Upcustomer() throws SQLException {
		c = Menu.Connect();
		setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
		setBounds(400, 100, 684, 461);
		contentPane = new JPanel();
		contentPane.setBackground(new Color(255, 250, 205));
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
		setContentPane(contentPane);
		contentPane.setLayout(null);
		
		JButton btnNewButton = new JButton("Updatepass");
		btnNewButton.setBorder(null);
		btnNewButton.setBackground(new Color(220, 20, 60));
		btnNewButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				try {
					checkavailable_1();
					
					String query = "SELECT * FROM Authentication_Login WHERE Login_Role = 'Customer';";
					PreparedStatement stmt = c.prepareStatement(query);
					ResultSet rs2 = stmt.executeQuery();
					ManagerFrame.table_2.setModel(DbUtils.resultSetToTableModel(rs2));
					
				} catch (SQLException e1) {
					
					e1.printStackTrace();
				}
				
			}
		});
		btnNewButton.setBounds(120, 202, 123, 22);
		contentPane.add(btnNewButton);
		
		newpass = new JTextField();
		newpass.setBounds(264, 202, 254, 22);
		contentPane.add(newpass);
		newpass.setColumns(10);
		
		JButton btnNewButton_1 = new JButton("UpdateName");
		btnNewButton_1.setBackground(new Color(220, 20, 60));
		btnNewButton_1.setBorder(null);
		btnNewButton_1.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				try {
					checkavailable_2();
					
					String query = "SELECT * FROM Authentication_Login WHERE Login_Role = 'Customer';";
					PreparedStatement stmt = c.prepareStatement(query);
					ResultSet rs2 = stmt.executeQuery();
					ManagerFrame.table_2.setModel(DbUtils.resultSetToTableModel(rs2));
					} catch (SQLException e1) {
					
					e1.printStackTrace();
				}
				
			
			}
		});
		btnNewButton_1.setBounds(120, 273, 123, 23);
		contentPane.add(btnNewButton_1);
		
		newname = new JTextField();
		newname.setBounds(264, 273, 254, 22);
		contentPane.add(newname);
		newname.setColumns(10);
		
		JButton btnNewButton_2 = new JButton("UpdateAddress");
		btnNewButton_2.setBackground(new Color(220, 20, 60));
		btnNewButton_2.setBorder(null);
		btnNewButton_2.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				try {
					checkavailable_3();
					
					String query = "SELECT * FROM Authentication_Login WHERE Login_Role = 'Customer';";
					PreparedStatement stmt = c.prepareStatement(query);
					ResultSet rs2 = stmt.executeQuery();
					ManagerFrame.table_2.setModel(DbUtils.resultSetToTableModel(rs2));
				} catch (SQLException e1) {
					
					e1.printStackTrace();
				}
				
			}
		});
		btnNewButton_2.setBounds(120, 339, 123, 29);
		contentPane.add(btnNewButton_2);
		
		newaddress = new JTextField();
		newaddress.setBounds(264, 339, 254, 29);
		contentPane.add(newaddress);
		newaddress.setColumns(10);
		
		JLabel SelectAccount = new JLabel("");
		SelectAccount.setIcon(new ImageIcon (new ImageIcon("Image/username.png").getImage().getScaledInstance(73,60, java.awt.Image.SCALE_SMOOTH)));
		SelectAccount.setBackground(Color.WHITE);
		SelectAccount.setHorizontalAlignment(SwingConstants.CENTER);
		SelectAccount.setBounds(160, 118, 73, 60);
		contentPane.add(SelectAccount);
		
		account = new JTextField();
		account.setBounds(264, 143, 254, 28);
		contentPane.add(account);
		account.setColumns(10);
		
		btnNewButton_3 = new JButton("DONE");
		btnNewButton_3.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				dispose();
			}
		});
		btnNewButton_3.setBackground(Color.ORANGE);
		btnNewButton_3.setBorder(null);
		btnNewButton_3.setFont(new Font("Tahoma", Font.BOLD, 13));
		btnNewButton_3.setBounds(295, 398, 143, 29);
		contentPane.add(btnNewButton_3);
		
		JPanel panel = new JPanel();
		panel.setBackground(new Color(107, 142, 35));
		panel.setBounds(0, 0, 684, 71);
		contentPane.add(panel);
		panel.setLayout(null);
		
		JLabel lblNewLabel_1 = new JLabel("");
		lblNewLabel_1.setBounds(621, 0, 63, 63);
		panel.add(lblNewLabel_1);
		lblNewLabel_1.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				dispose();
			}
			
			
		});
		lblNewLabel_1.setIcon(new ImageIcon(new ImageIcon("Image/X.png").getImage().getScaledInstance(63,63, java.awt.Image.SCALE_SMOOTH)));
		
		JLabel lblNewLabel_2 = new JLabel("");
		lblNewLabel_2.setIcon(new ImageIcon(new ImageIcon("Image/3802954.jpg").getImage().getScaledInstance(684,461, java.awt.Image.SCALE_SMOOTH)));
		lblNewLabel_2.setBounds(0, 0, 684, 461);
		contentPane.add(lblNewLabel_2);
		
		
		
		
		
		
		
	}
	//update passs
	  public void insert_1(String username,String userpassword) throws SQLException {
			String sql = "UPDATE Authentication_Login\r\n" + 
					"SET userpassword = '"+userpassword+
					"' WHERE username = '"+username+"';";
		PreparedStatement stmt = c.prepareStatement(sql);
		
	   
        stmt.executeUpdate();}
      //update name
        public void insert_2(String username,String name) throws SQLException {
			String sql = "UPDATE Authentication_Login\r\n" + 
					"SET name = '"+name+
					"' WHERE username = '"+username+"';";
		PreparedStatement stmt = c.prepareStatement(sql);
		
	   
        stmt.executeUpdate();}
        //update address
        public void insert_3(String username,String address) throws SQLException {
			String sql = "UPDATE Authentication_Login\r\n" + 
					"SET address = '"+address+
					"' WHERE username = '"+username+"';";
		PreparedStatement stmt = c.prepareStatement(sql);
	
	   
        stmt.executeUpdate();
	   }
        //check acc available to update
        
        public void checkavailable_1() throws SQLException {
      	  
      		String username = account.getText();
  			String sql = "SELECT username From Authentication_Login where username  ='"+username +"';";

      		PreparedStatement stmt = c.prepareStatement(sql);
      		ResultSet rs = stmt.executeQuery();
      		if (rs.next() == false) {
      			JOptionPane.showMessageDialog(null, "Account not available");
				account.setText("");
				newpass.setText("");

      		} else {
				insert_1(account.getText(),newpass.getText());

        
  }}
       
        
        public void checkavailable_2() throws SQLException {
      	  
      		String username = account.getText();
  			String sql = "SELECT username From Authentication_Login where username  ='"+username +"';";

      		PreparedStatement stmt = c.prepareStatement(sql);
      		ResultSet rs = stmt.executeQuery();
      		if (rs.next() == false) {
      			JOptionPane.showMessageDialog(null, "Account not available");
				account.setText("");
				newname.setText("");
      		} else {
		        insert_2(account.getText(),newname.getText());
}}
        public void checkavailable_3() throws SQLException {
        	  
      		String username = account.getText();
  			String sql = "SELECT username From Authentication_Login where username  ='"+username +"';";

      		PreparedStatement stmt = c.prepareStatement(sql);
      		ResultSet rs = stmt.executeQuery();
      		if (rs.next() == false) {
      			JOptionPane.showMessageDialog(null, "Account not available");		
      			account.setText("");
      			newaddress.setText("");
      			
      		} else {
		insert_3(account.getText(),newaddress.getText());
      		}}

     }