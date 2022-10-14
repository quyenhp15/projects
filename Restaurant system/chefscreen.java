
import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.EventQueue;
import java.awt.FlowLayout;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import javax.swing.table.JTableHeader;
import javax.swing.table.TableColumn;
import javax.swing.table.TableModel;


import java.awt.Font;
import java.awt.Label;
import java.awt.List;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.ArrayList;
import java.sql.*;

public class chefscreen extends JPanel {

//	private JPanel contentPane;
	
	private JTable orderTable;
	private JButton btnDone, btnRefresh;
	static ArrayList<Order> delivery;

	String[] column = { "Bill", "Name", "Food", "Unit", "Table", "Date", "Status" };

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					chefscreen frame = new chefscreen();
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
	public chefscreen() {
//		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
//		setBounds(100, 100, 861, 621);
//		contentPane = new JPanel();
//		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
//		contentPane.setBounds(100, 100, 861, 621);
//		setContentPane(contentPane);
//		contentPane.setLayout(null);

		setBounds(0, 0, Window.getW(), Window.getH());
		setLayout(null);

		JPanel W = new JPanel(new BorderLayout());
		W.setVisible(true);
		W.setBackground(new Color(107, 142, 35));
		W.setBounds(Window.getW()-900, 10, 800, 100);
		add(W);
		
		JLabel name = new JLabel("LQD");
		name.setFont(new Font("Harlow Solid Italic", Font.ITALIC, 50));
		name.setBounds(60, 10, 220, 100);
		name.setForeground(Color.white);
		name.setVisible(true);
		add(name);
		
		JPanel greenLine = new JPanel(new BorderLayout(40,30));
	    greenLine.setBackground(new Color(107, 142, 35));
	    greenLine.setBounds(0,0,Window.getW(),120);
	    greenLine.setVisible(true);
	    add(greenLine);
	  
		String todaysOrder = "TODAY'S ORDERS";
		JLabel lblTodaysOrders = new JLabel(todaysOrder, SwingConstants.RIGHT);
		lblTodaysOrders.setFont(new Font(".VnArial", Font.BOLD, 60));
		lblTodaysOrders.setForeground(Color.white);
		W.add(lblTodaysOrders,BorderLayout.SOUTH);

		JLabel lblWelcome = new JLabel("Welcome, " + LoginFrame.user.getName(), SwingConstants.RIGHT);
		lblWelcome.setFont(new Font(".VnArial", Font.BOLD, 20));
		lblWelcome.setBounds(Window.getW() - 500, 44, 600, 62);
		lblWelcome.setForeground(Color.white);
//		contentPane.
		W.add(lblWelcome,BorderLayout.NORTH);

		
		
		btnDone = new JButton("Done");
		btnDone.setFont(new Font("Tahoma", Font.PLAIN, 22));
		btnDone.setBounds(Window.getW()/2-100, Window.getH() - 200, 207, 79);
		btnDone.addActionListener(new ActionListener() {
			private Connection c = null;

			public void actionPerformed(ActionEvent e) {
				try {
					int i = orderTable.getSelectedRow();

					if (i < 0) {
						JOptionPane.showMessageDialog(null, "Please choose a line to perform action");
					} else {
						c = Menu.Connect();
//						String change = "update Delivery set status =1 where id='" + item(i, 0) + "' and name ='"
//								+ item(i, 1) + "' and food ='" + item(i, 2) + "' and date = '"+item(i,5)+"'";
						String change = "DELETE FROM Delivery where id='" + item(i, 0) + "' and name ='"
								+ item(i, 1) + "' and food ='" + item(i, 2) + "' and date = '"+item(i,5)+"'";
						PreparedStatement st = c.prepareStatement(change);
						st.executeUpdate();
						orderTable.setModel(createTableModel()); // updateTable()
						refreshHeader(column);
					}

				} catch (Exception err) {
					System.out.println(err);
				}

			}

		});
//		contentPane.
		add(btnDone);
		btnRefresh = new JButton("Refresh");
		btnRefresh.setFont(new Font("Tahoma", Font.PLAIN, 22));
		btnRefresh.setBounds(btnDone.getX() + 500, btnDone.getY(), 207, 79);
		btnRefresh.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent arg0) {
				Connection c;
				System.out.println(orderTable.getSelectedRowCount());
				orderTable.setModel(createTableModel());
				refreshHeader(column);
				try {
					c = Menu.Connect();
					String change = "update Delivery set status =0 where status =2";
					PreparedStatement st = c.prepareStatement(change);
					st.executeUpdate();
					c.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}

			}

		});
		add(btnRefresh);
		
		JButton bLogout = new JButton("Log out");
		bLogout.setFont(new Font("Tahoma", Font.PLAIN, 22));
		bLogout.setBounds(btnDone.getX() - 500, btnDone.getY(), 207, 79);
		bLogout.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				LoginFrame.user.Logout();
			}
		});
		add(bLogout);

		orderTable = new JTable(createTableModel()) {

			@Override
			public boolean isCellEditable(int row, int column) {
				return false;
			}
			
		};
		orderTable.setFont(new Font("Tahoma", Font.PLAIN, 30));
		orderTable.getTableHeader().setFont(new Font("SansSerif", Font.BOLD, 30));
		orderTable.setRowHeight(60);

		// add column header
		refreshHeader(column);

		JScrollPane js = new JScrollPane(orderTable);
		js.setBounds(0, 130, Window.getW() - 20, btnDone.getY() - 200);
		js.setVisible(true);
		add(js);

	}

	public ArrayList<Order> delivery() {
		Connection c = null;
		ArrayList<Order> delivery = new ArrayList<Order>();
		try {

			c = Menu.Connect();
			String Table = "select id, name, food, unit, address, date, status from Delivery where status =0 or status=2";
			PreparedStatement st = c.prepareStatement(Table);
			ResultSet rs = st.executeQuery();
			while (rs.next()) {
				Order order = new Order(rs.getInt("id"), rs.getString("name"), rs.getString("food"), rs.getInt("unit"),
						rs.getString("address"),rs.getString("date"), rs.getInt("status"));
				delivery.add(order);
			}

		} catch (Exception e) {
			System.out.println(e);
		}

		return delivery;

	}

	private String item(int i, int a) {
		return orderTable.getValueAt(i, a).toString();
	}

	public DefaultTableModel createTableModel() {
		delivery = delivery();
		Object[] row = new Object[column.length];
		DefaultTableModel model = new DefaultTableModel(0, column.length);

		// add row
		for (int i = 0; i < delivery.size(); i++) {
			row[0] = delivery.get(i).getId();
			row[1] = delivery.get(i).getName();
			row[2] = delivery.get(i).getFood();
			row[3] = delivery.get(i).getUnit();
			row[4] = delivery.get(i).getAddress();
			row[5]= delivery.get(i).getDate();
			if (delivery.get(i).getStatus() == 0) {
				row[6] = "Not yet";
			} else
				row[6] = "New";
			model.addRow(row);

		}

		return model;

	}

	private void refreshHeader(String[] column) {
		for (int i = 0; i < column.length; i++) {
			JTableHeader header = orderTable.getTableHeader();
			TableColumn col = header.getColumnModel().getColumn(i);
			col.setHeaderValue(column[i]);
			header.repaint();
		}
	}

}
