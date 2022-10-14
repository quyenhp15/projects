
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

import net.proteanit.sql.DbUtils;

import java.sql.*;

import javax.swing.JButton;
import javax.swing.JTextField;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.SwingConstants;
import java.awt.Color;
import javax.swing.JComboBox;
import javax.swing.JToggleButton;
import java.awt.Font;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;
import javax.swing.ImageIcon;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;

public class Uptable extends JFrame {

	private JPanel contentPane;
	private JTextField ID;
	private JTextField Status;
	private static Connection c;

	/**
	 * Launch the application.
	 * 
	 * @throws SQLException
	 */
	public static void main(String[] args) throws SQLException {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					Uptable frame = new Uptable();
					frame.setUndecorated(true);;
					frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
//		Connection ct = Connect();
		PreparedStatement stmt = c.prepareStatement("SELECT * FROM Res_table;");
		ResultSet r = stmt.executeQuery();
		while (r.next()) {
			System.out.println(r.getInt("tableID") + " " + r.getInt("Table_status"));
		}
	}

	public Uptable() throws SQLException {
		c = Menu.Connect();

		setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
		setBounds(300, 100, 414, 161);
		contentPane = new JPanel();
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
		setContentPane(contentPane);
		contentPane.setLayout(null);

		ID = new JTextField();
		ID.addKeyListener(new KeyAdapter() {
			@Override
			public void keyPressed(KeyEvent e) {
				try {
					int attempt = Integer.parseInt(ID.getText()+e.getKeyChar());

                        } catch (NumberFormatException e2) {
                        	JOptionPane.showMessageDialog(null, "Can't input string");
                        	ID.setText("");
					
				}
		}});
		ID.setBounds(124, 64, 149, 25);
		contentPane.add(ID);
		ID.setColumns(10);

		Status = new JTextField();
		Status.setBounds(124, 115, 149, 25);
		contentPane.add(Status);
		Status.setColumns(10);

		JLabel lblNewLabel = new JLabel("");
		lblNewLabel.setIcon(new ImageIcon(new ImageIcon("Image/letter.png").getImage().getScaledInstance(52,42, java.awt.Image.SCALE_SMOOTH)));
		lblNewLabel.setFont(new Font("Tahoma", Font.BOLD, 13));
		lblNewLabel.setForeground(new Color(0, 0, 0));
		lblNewLabel.setHorizontalAlignment(SwingConstants.CENTER);
		lblNewLabel.setBounds(47, 46, 52, 42);
		contentPane.add(lblNewLabel);

		JLabel lblNewLabel_1 = new JLabel("");
		lblNewLabel_1.setIcon(new ImageIcon(new ImageIcon("Image/boolean.png").getImage().getScaledInstance(52,42, java.awt.Image.SCALE_SMOOTH)));
		lblNewLabel_1.setHorizontalAlignment(SwingConstants.CENTER);
		lblNewLabel_1.setFont(new Font("Tahoma", Font.BOLD, 13));
		lblNewLabel_1.setBounds(47, 99, 52, 48);
		contentPane.add(lblNewLabel_1);

		JButton btnNewButton = new JButton("Add");
		btnNewButton.setBackground(Color.ORANGE);
		btnNewButton.setBorder(null);
		btnNewButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
           

				try {
                
					checkstatus();
					ID.setText("");
					Status.setText("");
					String query = "SELECT * FROM Res_table ORDER by tableID;";
					PreparedStatement stmt = c.prepareStatement(query);
					ResultSet rs = stmt.executeQuery();
					ManagerFrame.table_2.setModel(DbUtils.resultSetToTableModel(rs));
				} catch (SQLException e1) {
                    
					e1.printStackTrace();
				}
			}
		});
		btnNewButton.setBounds(297, 65, 89, 23);
		contentPane.add(btnNewButton);

		JButton btnNewButton_1 = new JButton("Delete");
		btnNewButton_1.setBorder(null);
		btnNewButton_1.setBackground(Color.ORANGE);
		btnNewButton_1.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				try {
					checkavailable();
					ID.setText("");
					Status.setText("");
					String query = "SELECT * FROM Res_table Order by tableID ;";
					PreparedStatement stmt = c.prepareStatement(query);
					ResultSet rs = stmt.executeQuery();
					ManagerFrame.table_2.setModel(DbUtils.resultSetToTableModel(rs));

				} catch (SQLException e1) {

					e1.printStackTrace();
				}

			}
		});
		btnNewButton_1.setBounds(297, 116, 89, 23);
		contentPane.add(btnNewButton_1);
		
		JLabel lblNewLabel_2 = new JLabel("New label");
		lblNewLabel_2.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				dispose();
			}
		});
		lblNewLabel_2.setBounds(379, 0, 35, 31);
		lblNewLabel_2.setIcon(new ImageIcon(new ImageIcon("Image/X.png").getImage().getScaledInstance(35,31, java.awt.Image.SCALE_SMOOTH)));
		contentPane.add(lblNewLabel_2);
		
		JLabel lblNewLabel_3 = new JLabel("");
		lblNewLabel_3.setBounds(0, 0, 414, 161);
		lblNewLabel_3.setIcon(new ImageIcon(new ImageIcon("Image/3802954.jpg").getImage().getScaledInstance(414,161, java.awt.Image.SCALE_SMOOTH)));;

		contentPane.add(lblNewLabel_3);
		
		
		

	}
// ADD
	public void insert(int tableID, int Table_status) throws SQLException {
		String sql = "Insert into Res_table(tableID, Table_status) VALUES(?,?)";

//		Connection c = Connect();
		PreparedStatement stmt = c.prepareStatement(sql);
		stmt.setInt(1, tableID);
		stmt.setInt(2, Table_status);
		stmt.executeUpdate();

	}
// DELETE
	public void insert_2(int tableID) throws SQLException {
		String sql = "Delete from Res_table where tableID = ? ;";

//		Connection c = Connect();
		PreparedStatement stmt = c.prepareStatement(sql);
		stmt.setInt(1, tableID);
		stmt.executeUpdate();

	}
   //check 1
	public void checkexist() throws SQLException {
		String sql = "SELECT tableID From Res_table where tableID = ? ;";

//		Connection c = Connect();
		PreparedStatement stmt = c.prepareStatement(sql);
		stmt.setInt(1, Integer.parseInt(ID.getText()));
		ResultSet rs = stmt.executeQuery();
		if (rs.next() == true) {
			JOptionPane.showMessageDialog(null, "Table existed");
		} else {
			 {
					
					if(Status.getText().isEmpty()) insert(Integer.parseInt(ID.getText()), 0);
					else insert(Integer.parseInt(ID.getText()), Integer.parseInt(Status.getText()));
				}
			}
		
	}
//check 2
	public void checkavailable() throws SQLException {
		String sql = "SELECT tableID From Res_table where tableID = ? ;";

//		Connection c = Connect();
		PreparedStatement stmt = c.prepareStatement(sql);
		stmt.setInt(1, Integer.parseInt(ID.getText()));
		ResultSet rs = stmt.executeQuery();
		if (rs.next() == false) {
			JOptionPane.showMessageDialog(null, "Table not available");
		} else {
			insert_2(Integer.parseInt(ID.getText()));
		}

	}
	public void checkstatus() throws SQLException {
		if (Status.getText().equals("0") || Status.getText().equals("1")) {
			checkexist();
		}else {
			JOptionPane.showMessageDialog(null, "Status not available. Please input 0 or 1");
		}
	}
}
