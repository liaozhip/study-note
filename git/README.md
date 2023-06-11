### 初始化操作

- `git init` 初始化仓库。
- `git status` 查看仓库当前状态。
- `git config --global --list` 查看全局设置相关参数列表。
- `git config --local --list` 查看本地设置相关参数列表。
- `git config --system --list` 查看系统配置参数列表。
- `git config --list` 查看所有Git的配置(全局+本地+系统)。
- `git config --global user.name "用户名"` 设置用户名。
- `git config --global user.email "用户邮箱"` 设置邮箱。
- `git config --global user.name` 查看用户名是否配置成功。
- `git config --global user.email` 查看邮箱是否配置。

### 打标签

- `git tag 标签` 打标签命令，默认为HEAD。
- `git tag` 显示所有标签。
- `git tag 标签 版本号` 给某个commit版本添加标签。
- `git show 标签` 显示某个标签的详细信息。

### 分支操作

- `git branch dev`  创建分支。
- `git checkout dev`  切换分支。
- `git branch` 查看分支。
- `git branch -M main` 修改当前分支的名称为 main。
- `git merge dev` #用于合并指定分支到当前分支。
- `git checkout -b dev` -b表示创建并切换分支。
- `git branch -d dev` 删除分支。
- `git log --graph --pretty=oneline --abbrev-commit` 查看分支合并图。

### 暂存区操作

- `git add filename` 将工作区的某个文件添加到暂存区。
- `git add .` 将当前工作区修改、添加删除的所有文件都加入暂存区。
- `git add -u` 添加所有被跟踪的文件中被修改、删除的文件信息到暂存区，不处理未跟踪的文件。
- `git add -A` 添加所有被跟踪文件中被修改、删除的文件信息到暂存区，包括未跟踪的文件。
- `git add -i` 进入交互界面模式，按需添加文件到缓存区。
- `git reset ` 默认会加 -mixed 重置暂存区的文件，此时历史与上一次的提交(commit)保持一致，工作区保持不变。
- `git reset HEAD .` 取消暂存区的所有文件。
- `git reset HEAD filename` 取消暂存区的指定文件。
- `git rm --cached filename` 撤销添加到暂存区的操作。
- `git rm -f filename` 删除暂存区和工作区的文件。

### 提交操作

- `git commit -m '提交说明'`  将暂存区内容提交到本地仓库。
- `git commit -a -m` '提交说明' 跳过缓存区操作，直接把工作区内容提交到本地仓库。
- `git revert master id` 恢复 git 仓库的先前状态，并将更改反映在 git 日志中。
- `git commit -a -e` 提交为解决冲突而修改的代码。
- `git reset HEAD^` 恢复成上次提交的版本。
- `git reset HEAD^^` 恢复成上上次提交的版本，就是多个^，以此类推。
  - `--soft` 移动HEAD指针，不改变工作区和暂存区内容。
  - `--hard` 移动HEAD指针，改变工作区和暂存区内容。

### 日志查看

- `git log`  查看所有commit记录。
- `git log --oneline` 让提交记录以精简的一行输出。
- `git log -p -次数` 查看最近多少次的提交记录，内容非常详细。
- `git log filename` 查看某文件的修改记录。
- `git log --author=作者` 查询作者的提交记录。
- `git log --grep=提交信息` 列出提交信息中包含过滤信息的提交记录。
- `git log --graph --all --oneline` 图形展示分支的合并历史。
- `git log --stat` 简略显示每次提交的内容更改。

### 远程操作

- `git remote add origin git远程仓库地址` 关联远程仓库。
- `git clone 远程仓库地址` 克隆远程仓库项目。 
- `git push -u origin main` 推送远程，-u默认推送到origin上的main分支。
- `git fetch` 将远程最新的内拉取到本地。
- `git pull` 从远程获取最新的代码并合并本地的版本。相当于git fetch + git merge。