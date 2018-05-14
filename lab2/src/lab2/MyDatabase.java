package lab2;



import java.sql.*;
import java.util.Scanner;

public class MyDatabase {
    private static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
    private static final String DB_URL = "jdbc:mysql://localhost:3306/sct?characterEncoding=UTF-8&useSSL=true&serverTimezone=GMT";
    private static final String USER = "root";
    private static final String PASSWORD = "123456789";

    private Connection connection;
    private Statement statement;

    public static void main(String[] args) {
        MyDatabase db = new MyDatabase();
        Scanner scanner = new Scanner(System.in);
        String line;
        String[] cmd;
        while (!(line = scanner.nextLine()).equals("stop")) {
            cmd = line.split("\\s+");
            if (!cmd[0].equals("student_query") || !cmd[1].equals("-q") || !cmd[3].equals("-p")) {
                System.out.println("invalid command! please try again.");
            } else {
                db.query(Integer.valueOf(cmd[2]), cmd[4]);
            }
        }
    }

    private MyDatabase() {
        try {
            Class.forName(JDBC_DRIVER).newInstance();
            connection = DriverManager.getConnection(DB_URL, USER, PASSWORD);
            statement = connection.createStatement();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    void query(int index, String param) {
        String sql;
        String cols;
        try {
            switch (index) {
                case 1:
                    // 选择了课程号为param的学生的学号
                    sql = "select s.snum from student s, sc where s.snum = sc.snum and sc.cnum='" + param + "'";
                    cols = "snum";
                    break;
                case 2:
                    // 学号为param的学生选择的所有课程号和成绩
                    sql = "select cnum, score from sc where snum='" + param + "'";
                    cols = "cnum score";
                    break;
                case 3:
                    // 选择了课程名为param的学生的姓名
                    sql = "select s.sname from student s, sc, course c where s.snum = sc.snum and sc.cnum = c.cnum and c.cname='"
                            + param + "'";
                    cols = "sname";
                    break;
                case 4:
                    // 姓名为param的学生所选所有课程的课程名，学时，学分和开课学期号
                    sql = "select cname, chours, credit, csemster from student s, sc, course c " +
                            "where s.snum = sc.snum and sc.cnum = c.cnum and s.sname = '" + param + "'";
                    cols = "cname chours credit csemster";
                    break;
                case 5:
                    // 查询成绩在param分以上的学生姓名、课程号和成绩
                    sql = "select sname, cnum, score from student s, sc where s.snum = sc.snum and sc.score>" + param;
                    cols = "sname cnum score";
                    break;
                case 6:
                    // 统计选课平均分低于param的学生学号和成绩
                    sql = "select sname, avg(score) from student s, sc where s.snum = sc.snum group by s.snum having avg(score)<" +
                            param;
                    cols = "sname avg(score)";
                    break;
                case 7:
                    // 统计姓名为param的学生选修的课程数
                    sql = "select count(cnum) from student s, sc where s.snum = sc.snum and s.sname='" + param +
                            "' group by s.snum";
                    cols = "count(cnum)";
                    break;
                case 8:
                    // 查询课程名为param的课程的最高分、最低分和平均分
                    sql = "select max(score), min(score), avg(score) from sc, course c where sc.cnum = c.cnum " +
                            "and c.cname='" + param + "' group by c.cnum";
                    cols = "max(score) min(score) avg(score)";
                    break;
                default:
                    sql = null;
                    cols = "";
            }
            if (sql != null) printResultSet(statement.executeQuery(sql), cols.split("\\s+"));
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    private void printResultSet(ResultSet rs, String[] cols) {

        for (String s : cols) {
            System.out.printf("%12s", s);
        }
        System.out.println();
        try {
            while (rs.next()) {
                for (String s : cols) {
                    System.out.printf("%12s", rs.getString(s));
                }
                System.out.println();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
