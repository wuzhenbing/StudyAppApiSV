import { DbUtils } from "../db/dbutils";
import { TextBoxInfo } from "../dto/text-box";

export class TextBoxInfoDao {
    public static SELECT_SQL = `
        select 
           id,title,courseCount,createdDate 
        from 
           textBookInfo 
        order by 
            createdDate
    `;

    public static INSERT_SQL = `
        insert into textBookInfo(title,courseCount) values(?,?);
    `;

    public static DELETE_SQL = `
        delete from textBookInfo where id in (?)
    `;

    public static UPDATE_SQL = `
        update  textBookInfo set title=?,courseCount =? where id = ?
    `;

    public static selectAll() {
        return new Promise((resolve, reject) => {
            const db = DbUtils.DbInstance;
            db.serialize(() => {
                db.all(this.SELECT_SQL, (error, rows) => {
                    if (error) {
                        console.error('Error!', error);
                        reject(error);
                        return;
                    } else {
                        // const textBoxInfos = new Array<TextBoxInfo>();
                        // rows.forEach(
                        //     (row) => {
                        //         const info = new TextBoxInfo();
                        //         info.id = row.id;
                        //         info.titile = row.titile;
                        //         info.courseCount = row.courseCount;
                        //         textBoxInfos.push(info);
                        //     }
                        // )
                        resolve(rows);
                    }
                });
            });
            db.close();
        }
        );
    }

    public static insert(info: TextBoxInfo) {
        return new Promise((resolve, reject) => {
            const db = DbUtils.DbInstance;
            db.serialize(() => {
                db.run(this.INSERT_SQL, [info.title, info.courseCount], (error) => {
                    if (error) {
                        console.error('Error!', error);
                        reject(error);
                        return;
                    } else {
                        resolve();
                    }
                });
            });
            db.close();
        }
        );
    }

    public static delete(info: number[]) {
        return new Promise((resolve, reject) => {
            const db = DbUtils.DbInstance;
            db.serialize(() => {
                const sql = this.DELETE_SQL.replace('?', info.join(','));
                db.run(sql, (error) => {
                    if (error) {
                        console.error('Error!', error);
                        reject(error);
                        return;
                    } else {
                        resolve();
                    }
                });
            });
            db.close();
        }
        );
    }

    public static update(info: TextBoxInfo) {
        return new Promise((resolve, reject) => {
            const db = DbUtils.DbInstance;
            db.serialize(() => {
                db.run(this.UPDATE_SQL, [info.title, info.courseCount, info.id], (error) => {
                    if (error) {
                        console.error('Error!', error);
                        reject(error);
                        return;
                    } else {
                        resolve();
                    }
                });
            });
            db.close();
        }
        );
    }
}